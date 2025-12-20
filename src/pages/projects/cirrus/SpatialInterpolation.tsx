import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const SpatialInterpolation = () => {
  return (
    <Article>
      <TitleBlock title="Spatial Interpolation" />
      <TextBlock 
        text="Dual-tier interpolation: station-based (70.7%) uses distance weighting, neighbor-based (29.3%) fills gaps. 120x faster through vectorization: 21,000+ records/sec. But you can't interpolate missing data."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="Weather stations don't cover every location uniformly—they cluster near population centers and leave large gaps in remote areas. The Cirrus interpolation system had to estimate weather conditions for 121,484 grid cells using data from roughly 9,000 weather stations scattered unevenly across Canada. This spatial interpolation challenge required sophisticated algorithms to fill gaps intelligently, using distance-weighted calculations that preferentially trusted nearby stations while incorporating distant data when local coverage was poor. The system achieved 100% grid coverage through a dual-tier approach that balanced accuracy with completeness."
        sectionTitle="The Coverage Challenge"
      />
      
      <TextBlock 
        text="The interpolation strategy used two complementary methods working in sequence. Station-based interpolation ran first, using pre-assigned weather stations for each grid cell. For a cell needing temperature data on a specific date, the system queried its assigned stations (up to 30), filtered for stations with data on that date, and calculated a distance-weighted average."
        sectionTitle="Station-Based Interpolation"
      />
      <CodeBlock
        language="python"
        sectionTitle="Distance-Weighted Interpolation"
        caption="Inverse distance weighting gives nearby stations more influence"
        code={`import numpy as np

def interpolate_cell_value(cell_lat, cell_lon, station_data, distances):
    """
    Interpolate weather value for a grid cell
    
    Args:
        cell_lat, cell_lon: Cell coordinates
        station_data: Array of weather values from nearby stations
        distances: Array of distances (km) to each station
    """
    # Filter out stations with missing data
    valid_mask = ~np.isnan(station_data)
    valid_values = station_data[valid_mask]
    valid_distances = distances[valid_mask]
    
    if len(valid_values) == 0:
        return np.nan  # No data available
    
    # Inverse distance weighting: weight = 1 / distance²
    # Closer stations get exponentially more weight
    weights = 1 / (valid_distances ** 2)
    
    # Normalize weights to sum to 1
    weights = weights / np.sum(weights)
    
    # Weighted average
    interpolated_value = np.sum(valid_values * weights)
    
    return interpolated_value

# Example: Temperature interpolation
# Station 1: 15.2°C at 25km → weight = 1/625 = 0.0016
# Station 2: 16.8°C at 50km → weight = 1/2500 = 0.0004
# Station 3: 14.5°C at 75km → weight = 1/5625 = 0.0002
# Nearby stations dominate the interpolation`}
      />
      <TextBlock 
        text="Stations closer to the cell center received higher weights using inverse distance weighting: weight = 1 / distance². This approach successfully interpolated 70.7% of all weather values, creating high-quality estimates where station coverage was adequate."
        sectionTitle="Weighting Strategy"
      />
      
      <TextBlock 
        text="The remaining 29.3% of cells—those without sufficient nearby station data—required neighbor-based interpolation. Rather than leaving these cells empty, the system used spatial smoothing: if a cell lacked weather data but its neighbors had interpolated values, it calculated a weighted average of those neighbor values. This created spatially consistent weather patterns rather than leaving data gaps. A cell surrounded by cells showing 15-20°C temperatures would receive an interpolated value in that range, maintaining realistic weather gradients. This two-stage approach ensured complete coverage while distinguishing between high-quality (station-based) and medium-quality (neighbor-based) interpolations."
        sectionTitle="Neighbor-Based Fallback"
      />
      
      <TextBlock 
        text="The interpolation pipeline achieved exceptional performance through vectorization and batch processing. Rather than interpolating one cell-date combination at a time (slow, with database overhead for each query), the system loaded all weather data for an entire month into memory, pre-computed station-cell distances, and performed vectorized calculations using NumPy arrays."
        sectionTitle="Performance Optimization"
      />
      <CodeBlock
        language="python"
        sectionTitle="Vectorized Batch Processing"
        caption="120x speedup: 1,969 cell-days/sec through NumPy vectorization"
        code={`import numpy as np
import pandas as pd

# Load entire month of weather data at once (not per-cell queries)
weather_data = pd.read_sql(
    "SELECT station_id, date, temperature FROM weather WHERE date BETWEEN ? AND ?",
    conn, params=(start_date, end_date)
)

# Pre-compute distances for all cell-station pairs (one-time cost)
cell_coords = np.array([[lat, lon] for lat, lon in grid_cells])  # 121,484 x 2
station_coords = np.array([[lat, lon] for lat, lon in stations])  # 9,000 x 2

# Vectorized distance calculation (all pairs at once)
distances = haversine_distance_matrix(cell_coords, station_coords)
# Result: 121,484 x 9,000 matrix computed in seconds

# Vectorized interpolation for all cells on one date
def interpolate_all_cells_vectorized(date, weather_values):
    """Process all 121,484 cells at once using NumPy"""
    # weather_values: array of shape (9,000,) for this date
    
    # Inverse distance weights (121,484 x 9,000)
    weights = 1 / (distances ** 2)
    
    # Mask missing data
    valid_mask = ~np.isnan(weather_values)
    weights[:, ~valid_mask] = 0
    
    # Normalize weights per cell
    weight_sums = weights.sum(axis=1, keepdims=True)
    normalized_weights = weights / weight_sums
    
    # Weighted average for all cells (single matrix operation)
    interpolated = (normalized_weights * weather_values).sum(axis=1)
    
    return interpolated  # 121,484 interpolated values

# Process 2+ million cell-days in 10.3 hours (not 72-144 hours)`}
      />
      <TextBlock 
        text="This architectural shift improved performance by 120x—from an estimated 72-144 hours for the full dataset down to 10.3 hours. The optimized implementation processed 1,969 cell-days per second, making what seemed computationally infeasible into a production-ready overnight batch job."
        sectionTitle="Performance Results"
      />
      
      <TextBlock 
        text="Field-specific interpolation logic handled different weather variables with appropriate methods. Temperature interpolates smoothly over distance and can be reliably estimated from stations 100-200km away. Precipitation is more localized and spatially variable—rain in one location doesn't strongly predict rain 100km away. Snow depth has strong seasonal and elevation dependencies. The system used variable-specific distance thresholds and quality tiers, treating temperature with larger search radii while requiring closer stations for precipitation. This nuanced approach recognized that different weather phenomena have different spatial correlation lengths."
        sectionTitle="Variable-Specific Methods"
      />
      
      <TextBlock 
        text="Quality tiers provided transparency about interpolation confidence. High-quality interpolations (from stations within 100km) received quality markers indicating reliable data. Medium-quality (100-300km stations) and low-quality (300-800km or neighbor-based) interpolations were flagged appropriately. This metadata enabled downstream AI training to weight samples by confidence—training primarily on high-quality data while using lower-quality data for spatial consistency. The quality-aware approach prevented the AI from learning noise patterns from uncertain interpolations."
        sectionTitle="Quality Metadata"
      />
      
      <TextBlock 
        text="The interpolation system revealed a fundamental challenge in working with real-world scientific data: you cannot interpolate what does not exist. Despite sophisticated algorithms and careful parameter tuning, precipitation coverage reached only 31% because station networks simply didn't measure precipitation consistently across the coverage area. Wind speed coverage was 0%—the variable didn't exist in the historical dataset. This discovery came only after implementing the complete interpolation system, demonstrating that data engineering skills matter less than data availability when building predictive systems. The technical implementation succeeded, but inadequate source data made the project unviable."
        sectionTitle="Interpolation Limitations"
      />
    </Article>
  );
};

export default SpatialInterpolation;

