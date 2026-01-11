import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const SpatialInterpolation = () => {
  return (
    <Article>
      <TitleBlock title="Spatial Interpolation" />
      <TextBlock 
        text="I implemented dual-tier interpolation: station-based (70.7%) uses distance weighting, neighbor-based (29.3%) fills gaps. I achieved 120x faster performance through vectorization: 21,000+ records/sec. But you can't interpolate missing data."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="Weather stations don't cover every location uniformly—they cluster near population centers and leave large gaps in remote areas. My Cirrus interpolation system had to estimate weather conditions for 121,484 grid cells using data from roughly 9,000 weather stations scattered unevenly across Canada. This spatial interpolation challenge required sophisticated algorithms to fill gaps intelligently, using distance-weighted calculations that preferentially trusted nearby stations while incorporating distant data when local coverage was poor. I achieved 100% grid coverage through a dual-tier approach that balanced accuracy with completeness."
        sectionTitle="The Coverage Challenge"
      />
      
      <TextBlock 
        text="My interpolation strategy used two complementary methods working in sequence. Station-based interpolation ran first, using pre-assigned weather stations for each grid cell. For a cell needing temperature data on a specific date, the system queried its assigned stations (up to 30), filtered for stations with data on that date, and calculated a distance-weighted average."
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
# Station 1 has 4x more influence due to closer distance`}
      />
      <TextBlock 
        text="Station-based interpolation filled 70.7% of grid cells successfully, handling most populated and semi-populated regions where station coverage was adequate. The remaining 29.3% of cells (primarily remote areas) lacked sufficient station data for any given date. These cells needed a fallback strategy."
        sectionTitle="Coverage Analysis"
      />
      <TextBlock 
        text="Neighbor-based interpolation filled gaps by borrowing from successfully interpolated adjacent cells. If a remote cell had no direct station coverage, I checked its 8 neighboring cells (north, south, east, west, and diagonals). If neighbors had interpolated values, their average filled the gap. This approach propagated weather patterns spatially—assuming nearby areas had similar conditions. While less accurate than direct station interpolation, it ensured 100% coverage and worked reasonably well for remote regions where weather patterns vary gradually."
        sectionTitle="Neighbor-Based Fallback"
      />
      <TextBlock 
        text="The interpolation performance initially processed only 175 records per second—far too slow for 56 million weather records. I optimized through vectorization, replacing Python loops with NumPy array operations. The vectorized version processed 21,000+ records/second, a 120x speedup. This optimization meant interpolating the entire dataset in hours rather than weeks. The lesson I learned: for numerical computation at scale, vectorization isn't optional—it's essential. The algorithm was correct initially, but implementation choices made the difference between practical and impractical."
        sectionTitle="Performance Optimization"
      />
      <TextBlock 
        text="The fundamental limitation emerged during validation: you can't interpolate data that doesn't exist. When precipitation coverage was 83% at weather stations, interpolation couldn't magically increase it to 100% meaningful coverage. Interpolation spreads existing data spatially but can't create new information. This limitation became critical when discovering that wind speed and humidity had 0% coverage in the source dataset—no amount of sophisticated interpolation could estimate values for variables that were never measured. The technical implementation worked perfectly, but it couldn't overcome missing source data."
        sectionTitle="Fundamental Limits"
      />
      
      <TextBlock 
        text="The 120x performance improvement (from 175 to 21,000+ records/sec) demonstrates my ability to optimize numerical computation at scale. The vectorization approach transformed an impractical algorithm into a production-ready system. This work shows I can identify performance bottlenecks, apply appropriate optimization techniques (NumPy vectorization), and measure results quantitatively. The dual-tier interpolation strategy (70.7% station-based, 29.3% neighbor-based) shows system design thinking: using multiple approaches to handle different scenarios. These skills—performance optimization, spatial data processing, and system design—are directly applicable to data engineering and ML infrastructure work."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default SpatialInterpolation;
