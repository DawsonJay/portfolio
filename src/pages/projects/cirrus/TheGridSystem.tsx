import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TheGridSystem = () => {
  return (
    <Article>
      <TitleBlock title="The Grid System" />
      <TextBlock 
        text="Divided Canada into 121,484 curvature-adjusted 10km grid cells. KD-tree indexing assigns 30 nearest weather stations per cell in quality tiers. Discretization enables parallelization."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Cirrus project required transforming the continuous geography of southern Canada into a discrete computational grid—essentially turning the country into a game board where each cell could be analyzed independently. The system divided the region into 121,484 cells, each representing a 10km × 10km area. This wasn't arbitrary gridding: the cells were curvature-adjusted to account for Earth's spherical shape, ensuring consistent area calculations across different latitudes. The grid covered 41.75°N to 60.0°N latitude (southern Canada only, excluding northern territories), providing comprehensive coverage for wildfire prediction while maintaining computational feasibility."
        sectionTitle="Curvature-Adjusted Grid"
      />
      
      <TextBlock 
        text="Each grid cell became a self-contained unit for weather interpolation and wildfire risk calculation. Rather than treating weather data as continuous fields, the cell-based approach enabled parallel processing, independent caching, and clear spatial boundaries for data aggregation. A cell at coordinates (lat: 52.5°N, lon: -115.3°W) could be processed entirely separately from its neighbors, with weather stations assigned based on proximity and data quality tiers. This architecture meant scaling from thousands to millions of cells required only horizontal scaling—more worker processes, not algorithmic changes."
        sectionTitle="Cell-Based Computation"
      />
      
      <TextBlock 
        text="The spatial indexing system used KD-trees for efficient nearest-neighbor queries, enabling fast station lookup for any grid cell. Each cell was pre-assigned up to 30 weather stations in three quality tiers: high quality (0-100km distance), medium quality (100-300km), and low quality (300-800km)."
        sectionTitle="Spatial Indexing"
      />
      <CodeBlock
        language="python"
        sectionTitle="KD-Tree Station Assignment"
        caption="Efficient nearest-neighbor queries for 121,484 cells"
        code={`from scipy.spatial import cKDTree
import numpy as np

# Load station coordinates (9,000+ stations)
station_coords = np.array([
    [lat1, lon1],
    [lat2, lon2],
    # ... 9,000+ stations
])

# Build KD-tree for fast spatial queries
tree = cKDTree(station_coords)

# For each grid cell, find 30 nearest stations
def assign_stations_to_cell(cell_lat, cell_lon):
    # Query KD-tree for 30 nearest neighbors
    distances, indices = tree.query([cell_lat, cell_lon], k=30)
    
    # Organize into quality tiers
    stations = {
        'high': [],    # 0-100km
        'medium': [],  # 100-300km
        'low': []      # 300-800km
    }
    
    for dist_deg, idx in zip(distances, indices):
        # Convert degree distance to km (approximate)
        dist_km = dist_deg * 111  # 1 degree ≈ 111km
        
        if dist_km < 100:
            stations['high'].append(idx)
        elif dist_km < 300:
            stations['medium'].append(idx)
        elif dist_km < 800:
            stations['low'].append(idx)
    
    return stations

# Pre-compute for all 121,484 cells (runs once)
# Reused for all weather variables and dates`}
      />
      <TextBlock 
        text="This tiered approach meant interpolation could preferentially use nearby, high-quality stations while falling back to distant stations only when necessary. The pre-computation saved massive time during actual interpolation—station assignments were calculated once and stored in a dedicated spatial index database, then reused for all weather variables and dates."
        sectionTitle="Quality Tiers"
      />
      
      <TextBlock 
        text="The 10km cell size represented a deliberate trade-off between resolution and computational feasibility. Smaller cells (5km) would quadruple the cell count to nearly half a million, requiring 4x processing time and storage. Larger cells (20km) would reduce resolution below what's useful for local wildfire prediction—wildfires have localized patterns that 20km cells would blur. The 10km size matched the scale of weather station spacing (typical distances of 50-100km between stations) and provided sufficient resolution for regional fire risk assessment without creating millions of cells to process."
        sectionTitle="Resolution Trade-offs"
      />
      
      <TextBlock 
        text="The grid system's coordinate handling required careful attention to projection systems and distance calculations. Geographic coordinates (latitude/longitude) don't have uniform distances—one degree of longitude near the Arctic is much shorter than near the equator. The system used haversine distance calculations for accurate great-circle distances between points, accounting for Earth's curvature."
        sectionTitle="Geographic Calculations"
      />
      <CodeBlock
        language="python"
        sectionTitle="Haversine Distance"
        caption="Accurate great-circle distance accounting for Earth's curvature"
        code={`import numpy as np

def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two points in km"""
    R = 6371  # Earth's radius in km
    
    # Convert to radians
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    
    return R * c

# Example: Distance from Vancouver to Calgary
# Vancouver: 49.2827°N, 123.1207°W
# Calgary: 51.0447°N, 114.0719°W
distance = haversine_distance(49.2827, -123.1207, 51.0447, -114.0719)
# Result: ~673 km (accurate great-circle distance)

# At 60°N, longitude degrees are half the distance of equator
# Haversine accounts for this automatically`}
      />
      <TextBlock 
        text="This mattered significantly in Canada's northern regions where naive Euclidean distance would introduce substantial errors. For a cell at 60°N, longitude degrees are half the distance of those at the equator, so proper spherical calculations were essential for accurate station weighting."
        sectionTitle="Why It Matters"
      />
      
      <TextBlock 
        text="Database storage for the grid system used a dedicated SQLite table with efficient indexing on latitude and longitude for fast spatial queries. The schema stored cell boundaries, center coordinates, area calculations, and pre-computed metadata. Queries like 'find all cells within a bounding box' or 'get cells in a specific province' executed in milliseconds using spatial indices. The total database size remained manageable (under 10MB for cell definitions) because cells stored only metadata—actual weather data and interpolations went in separate tables with foreign key relationships to cell IDs."
        sectionTitle="Database Design"
      />
      
      <TextBlock 
        text="The grid approach demonstrated a key principle in spatial computing: discretization enables parallelization. Continuous spatial fields require complex interpolation and boundary handling. Discrete cells enable independent processing, clear caching strategies, and embarrassingly parallel algorithms. This pattern appears across many domains: weather modeling uses grid cells, game engines use spatial partitioning, and databases use spatial indices. The Cirrus grid system showed understanding of this fundamental trade-off—accepting some discretization artifacts in exchange for massive improvements in computational efficiency and system simplicity."
        sectionTitle="Spatial Computing Principles"
      />
    </Article>
  );
};

export default TheGridSystem;

