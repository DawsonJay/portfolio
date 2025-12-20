import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const DataEngineeringAtScale = () => {
  return (
    <Article>
      <TitleBlock title="Data Engineering at Scale" />
      <TextBlock 
        text="6-stage pipeline processes 56M weather records + 438K wildfire events. Chunked loading bypasses fiona validation errors. Wide format schema optimizes ML queries. Modular stages enable independent testing."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Cirrus data pipeline processed 56 million weather records from NOAA's GHCN-Daily dataset and 438,000 wildfire events from the Canadian Forest Service, creating a 7.86GB SQLite database optimized for AI training."
        sectionTitle="Pipeline Overview"
      />
      <TextBlock 
        text="This wasn't simple data loading—it required downloading multi-gigabyte datasets, filtering by geography (southern Canada only) and time (1930-2025), handling corrupted records, validating data quality, and structuring everything for efficient machine learning access. The pipeline ran as a sequence of six stages, each building on the previous stage's output, with comprehensive error handling and progress logging throughout."
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
        
        print(f"Loaded {end}/{total_records}, "
              f"filtered {invalid_dates.sum()} invalid records")
    
    # Combine all chunks
    return pd.concat(all_fires, ignore_index=True)

# Result: 438,356 valid records from 442,403 total (0.9% loss)`}
      />
      <TextBlock 
        text="The solution used chunked loading to bypass fiona's date validation, then filtered invalid records post-load. Of 442,403 total records, only 4,047 had invalid dates (0.9% loss), demonstrating that most data was valid despite the problematic placeholders. Each fire event included location, date, size, and cause—key features for AI training."
        sectionTitle="Chunked Loading Solution"
      />
      
      <TextBlock 
        text="Stage 3 performed comprehensive data validation before database loading. Weather data validation checked for missing coordinates, out-of-range values (temperatures between -70°C and 60°C for Canada), duplicate records, and inconsistent station metadata. Wildfire data validation verified geographic bounds, date ranges, and fire size reasonability. The validation stage generated detailed reports documenting data quality issues, enabling informed decisions about data cleaning strategies. Records failing critical validations were flagged for manual review or automatic filtering, while records with minor issues were marked but retained."
        sectionTitle="Data Validation"
      />
      
      <TextBlock 
        text="Stage 4 created the raw weather database with schema optimized for subsequent interpolation. Rather than storing weather data in long format (one row per station-date-variable), the system used wide format (one row per station-date with columns for each variable). This eliminated expensive pivot operations during interpolation queries. Database indices on station_id and date enabled fast lookups during the billions of interpolation calculations. The wide format meant queries like 'get all weather variables for station X on date Y' required a single row retrieval rather than multiple joins."
        sectionTitle="Database Optimization"
      />
      
      <TextBlock 
        text="Stage 5 built the spatial index mapping each grid cell to its nearest weather stations using KD-tree algorithms. For 121,484 cells, the system calculated distances to all 9,000+ stations, then selected the nearest 30 stations per cell organized into quality tiers. This pre-computation took several hours but saved massive time during interpolation—station assignments were calculated once and reused billions of times. The spatial index database stored cell-station mappings, distances, and quality tiers, enabling Stage 6 to perform interpolation without recalculating spatial relationships."
        sectionTitle="Spatial Index Creation"
      />
      
      <TextBlock 
        text="Stage 6 generated the interpolated weather grid by processing 2+ million cell-date combinations using the pre-computed spatial index. The optimized implementation used vectorized NumPy operations and batch database loading, achieving 21,000+ records per second. Memory management was critical—processing the full 3-year dataset required careful chunking to avoid exhausting RAM while maintaining efficiency. The stage included comprehensive progress logging (cells processed per hour, estimated time remaining, memory usage) enabling monitoring during the 10+ hour processing runs."
        sectionTitle="Interpolation Processing"
      />
      
      <TextBlock 
        text="The multi-stage pipeline architecture demonstrated key data engineering principles: modular stages with clear inputs/outputs enabled testing each stage independently before running the full pipeline. Each stage wrote its output to disk (CSV files or databases), allowing pipeline restarts from any point without reprocessing early stages. Comprehensive logging captured processing rates, errors, and data quality metrics, enabling diagnosis of issues and optimization of bottlenecks. The staged approach transformed an overwhelmingly complex data engineering problem into a series of manageable, testable, debuggable components."
        sectionTitle="Pipeline Architecture"
      />
    </Article>
  );
};

export default DataEngineeringAtScale;

