import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const DataEngineeringAtScale = () => {
  return (
    <Article>
      <TitleBlock title="Data Engineering at Scale" />
      <TextBlock 
        text="I built a 6-stage pipeline that processes 56M weather records + 438K wildfire events. I used chunked loading to bypass fiona validation errors. I chose wide format schema to optimize ML queries. Modular stages enable independent testing."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Cirrus data pipeline processed 56 million weather records from NOAA's GHCN-Daily dataset and 438,000 wildfire events from the Canadian Forest Service, creating a 7.86GB SQLite database optimized for AI training."
        sectionTitle="Pipeline Overview"
      />
      <TextBlock 
        text="This wasn't simple data loading—it required downloading multi-gigabyte datasets, filtering by geography (southern Canada only) and time (1930-2025), handling corrupted records, validating data quality, and structuring everything for efficient machine learning access. I designed the pipeline as a sequence of six stages, each building on the previous stage's output, with comprehensive error handling and progress logging throughout."
        sectionTitle="Pipeline Complexity"
      />
      
      <TextBlock 
        text="Stage 1 collected historical weather data from NOAA by downloading and filtering GHCN-Daily station inventory and observations. The raw dataset covered the entire globe spanning over a century, requiring spatial filtering to Canadian coordinates (41.75°N to 60.0°N latitude) and temporal filtering to 1930+ to match wildfire data availability. The filtering reduced dataset size by over 90%, keeping only the 9,000+ weather stations relevant to southern Canada. Station metadata included location coordinates, elevation, station ID, and active date ranges—essential for subsequent interpolation stages."
        sectionTitle="Historical Data Collection"
      />
      
      <TextBlock 
        text="Stage 2 integrated Canadian wildfire data from shapefiles containing nearly a century of fire events. This stage encountered significant data quality challenges: the official dataset included placeholder records with invalid dates (YEAR=0, MONTH=0, DAY=0) that crashed the geopandas fiona library."
        sectionTitle="Wildfire Data Integration"
      />
      <CodeBlock
        language="python"
        sectionTitle="Chunked Shapefile Loading"
        caption="Bypass fiona validation by loading in chunks, then filter invalid dates"
        code={`import geopandas as gpd
import pandas as pd

def load_wildfire_data_chunked(shapefile_path, chunk_size=50000):
    """Load shapefile in chunks to bypass fiona date validation"""
    all_fires = []
    total_records = get_shapefile_count(shapefile_path)
    
    for start in range(0, total_records, chunk_size):
        end = min(start + chunk_size, total_records)
        
        # Load chunk (bypasses fiona's date validation)
        gdf_chunk = gpd.read_file(
            shapefile_path, 
            rows=slice(start, end)
        )
        
        # Filter invalid dates AFTER loading
        invalid_dates = (
            (gdf_chunk['YEAR'] == 0) | (gdf_chunk['YEAR'] == -9999) |
            (gdf_chunk['MONTH'] == 0) | (gdf_chunk['MONTH'] == -9999) |
            (gdf_chunk['DAY'] == 0) | (gdf_chunk['DAY'] == -9999)
        )
        
        gdf_valid = gdf_chunk[~invalid_dates]
        all_fires.append(gdf_valid)
        
        print(f"Loaded {end}/{total_records} records, "
              f"filtered {invalid_dates.sum()} invalid dates")
    
    return gpd.GeoDataFrame(pd.concat(all_fires, ignore_index=True))

# Result: 438,000 valid wildfire events from 1930-2025`}
      />
      <TextBlock 
        text="This chunked loading approach demonstrated a practical problem-solving pattern I learned: when standard libraries fail due to data quality issues, work around the validation rather than trying to fix the source data. Fiona's date validation was too strict for this dataset, but loading in chunks bypassed validation, allowing filtering of invalid records after loading. The solution wasn't elegant, but it worked reliably for processing hundreds of thousands of records."
        sectionTitle="Practical Solutions"
      />
      <TextBlock 
        text="The database schema used wide format (one row per date per cell, all weather variables as columns) rather than long format (one row per variable per cell per date). This decision optimized for ML training queries that need all weather variables for a specific cell and date. Wide format meant a single query retrieved complete feature vectors, while long format would require joins across millions of rows. The trade-off was database size (wider tables use more storage), but query performance mattered more for iterative model training."
        sectionTitle="Schema Design"
      />
      <TextBlock 
        text="I designed modular stages to enable independent testing and debugging. Each stage produced intermediate outputs that could be inspected, validated, and cached. If Stage 4 had problems, I could rerun just that stage using cached Stage 3 output rather than reprocessing from the beginning. This modularity saved hours during development, making it easy to iterate on individual pipeline components without full pipeline reruns. The lesson: complex systems benefit from checkpointing and restart capabilities."
        sectionTitle="Modular Design"
      />
      
      <TextBlock 
        text="This data engineering work demonstrates my ability to build production-scale data pipelines. Processing 56 million weather records and 438,000 wildfire events into a 7.86GB database required handling data quality issues (chunked loading to bypass validation errors), schema design (wide format for ML queries), and modular architecture (checkpointing, independent stage testing). The chunked loading solution shows practical problem-solving when standard libraries fail. The wide format schema choice demonstrates understanding of query patterns for ML training. This work shows data engineering skills: large-scale data processing, schema design, pipeline architecture, and handling real-world data quality issues—all essential for ML infrastructure and data engineering roles."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default DataEngineeringAtScale;
