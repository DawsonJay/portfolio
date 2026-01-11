import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const TheGridSystem = () => {
  return (
    <Article>
      <TitleBlock title="The Grid System" />
      <TextBlock 
        text="I divided Canada into 121,484 curvature-adjusted 10km grid cells. I used KD-tree indexing to assign 30 nearest weather stations per cell in quality tiers. This discretization enables parallelization."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Cirrus project required transforming the continuous geography of southern Canada into a discrete computational grid—essentially turning the country into a game board where each cell could be analyzed independently. I divided the region into 121,484 cells, each representing a 10km × 10km area. This wasn't arbitrary gridding: the cells were curvature-adjusted to account for Earth's spherical shape, ensuring consistent area calculations across different latitudes. The grid covered 41.75°N to 60.0°N latitude (southern Canada only, excluding northern territories), providing comprehensive coverage for wildfire prediction while maintaining computational feasibility."
        sectionTitle="Curvature-Adjusted Grid"
      />
      
      <TextBlock 
        text="Each grid cell became a self-contained unit for weather interpolation and wildfire risk calculation. Rather than treating weather data as continuous fields, my cell-based approach enabled parallel processing, independent caching, and clear spatial boundaries for data aggregation. A cell at coordinates (lat: 52.5°N, lon: -115.3°W) could be processed entirely separately from its neighbors, with weather stations assigned based on proximity and data quality tiers. This architecture meant scaling from thousands to millions of cells required only horizontal scaling—more worker processes, not algorithmic changes."
        sectionTitle="Cell-Based Computation"
      />
      
      <TextBlock 
        text="I used KD-trees for efficient nearest-neighbor queries in the spatial indexing system, enabling fast station lookup for any grid cell. Each cell was pre-assigned up to 30 weather stations in three quality tiers: high quality (0-100km distance), medium quality (100-300km), and low quality (300-800km)."
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
            stations['high'].append((idx, dist_km))
        elif dist_km < 300:
            stations['medium'].append((idx, dist_km))
        elif dist_km < 800:
            stations['low'].append((idx, dist_km))
    
    return stations

# Pre-compute for all 121,484 cells
grid_assignments = {}
for cell_id, (lat, lon) in enumerate(grid_cells):
    grid_assignments[cell_id] = assign_stations_to_cell(lat, lon)`}
      />
      <TextBlock 
        text="The quality tier system enabled fallback strategies during interpolation. Cells near urban areas had abundant high-quality stations within 100km. Remote cells in northern territories might have no high-quality stations, requiring medium or low-quality data. The system prioritized high-quality data but degraded gracefully when only distant stations were available, ensuring 100% grid coverage even for isolated regions."
        sectionTitle="Quality Tiers"
      />
      <TextBlock 
        text="Grid discretization transformed an intractable continuous problem into manageable parallel computation. Each cell's calculation was independent—no need for synchronization, no race conditions, no complex locking. I could process cells on separate CPU cores, separate machines, or even distribute across cloud workers. The approach demonstrated a key principle I learned: sometimes the right abstraction makes hard problems simple. Continuous weather fields are computationally complex; discrete grid cells are embarrassingly parallel."
        sectionTitle="Parallel Processing"
      />
      
      <TextBlock 
        text="This grid system design demonstrates my ability to transform continuous problems into discrete, parallelizable computations. The 121,484-cell grid with KD-tree indexing enabled efficient spatial queries and parallel processing. The quality tier system (high/medium/low) shows graceful degradation thinking—ensuring 100% coverage even when ideal data isn't available. This work shows spatial data engineering skills: grid design, spatial indexing, and parallel computation patterns. The ability to design systems that scale horizontally (more workers, not algorithmic changes) is valuable for data engineering and ML infrastructure work."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default TheGridSystem;
