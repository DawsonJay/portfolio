import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const GeneticAlgorithmEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Genetic Algorithm Evolution" />
      <TextBlock 
        text="50 XGBoost AIs compete. Top 5 survive (elite preservation). Crossover blends hyperparameters. Mutation explores new configs. Log loss fitness encourages calibrated probabilities."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="The Cirrus AI system used genetic algorithms to evolve optimal wildfire prediction models rather than hand-tuning hyperparameters or using grid search. Each AI in the population was an XGBoost classifier with unique hyperparameters: max_depth (3-15), n_estimators (50-500), learning_rate (0.01-0.3), subsample ratios, regularization values. The population of 50 AI models competed on the same prediction tasks, with fitness measured by log loss on wildfire predictions. Top performers survived to the next generation, while poor performers were eliminated. This evolutionary approach explored hyperparameter space more efficiently than exhaustive search while discovering configurations optimized specifically for the wildfire prediction task."
        sectionTitle="Competitive Evolution"
      />
      
      <TextBlock 
        text="The genetic algorithm used three core operators: selection, crossover, and mutation. Selection identified the top 5 best-performing AIs from each generation based on fitness scores—lower log loss meant better calibrated probability predictions."
        sectionTitle="Evolution Operators"
      />
      <CodeBlock
        language="python"
        sectionTitle="Crossover Operation"
        caption="Blend crossover combines hyperparameters from two parent AIs"
        code={`import random

def crossover(parent_a, parent_b):
    """Create offspring by blending parent hyperparameters"""
    child_config = {}
    
    for param in ['max_depth', 'n_estimators', 'learning_rate', 
                  'subsample', 'colsample_bytree', 'reg_alpha', 'reg_lambda']:
        
        if isinstance(parent_a[param], int):
            # Integer parameters: random choice or average
            if random.random() < 0.5:
                child_config[param] = parent_a[param]
            else:
                child_config[param] = parent_b[param]
        else:
            # Float parameters: blend crossover
            alpha = random.random()  # Blend factor 0-1
            child_config[param] = (
                alpha * parent_a[param] + 
                (1 - alpha) * parent_b[param]
            )
    
    return child_config

# Example:
# Parent A: max_depth=8, learning_rate=0.1
# Parent B: max_depth=12, learning_rate=0.05
# Child: max_depth=8 (inherited), learning_rate=0.073 (blended)`}
      />
      <CodeBlock
        language="python"
        sectionTitle="Mutation Operation"
        caption="Random variation explores new hyperparameter regions"
        code={`import random

def mutate(config, mutation_rate=0.2):
    """Randomly modify hyperparameters within valid ranges"""
    mutated = config.copy()
    
    # Each parameter has mutation_rate chance to mutate
    if random.random() < mutation_rate:
        # Mutate max_depth (3-15)
        mutated['max_depth'] = random.randint(3, 15)
    
    if random.random() < mutation_rate:
        # Mutate n_estimators (50-500)
        mutated['n_estimators'] = random.randint(50, 500)
    
    if random.random() < mutation_rate:
        # Mutate learning_rate (0.01-0.3)
        mutated['learning_rate'] = random.uniform(0.01, 0.3)
    
    if random.random() < mutation_rate:
        # Mutate subsample (0.5-1.0)
        mutated['subsample'] = random.uniform(0.5, 1.0)
    
    # ... similar for other parameters
    
    return mutated

# Mutation prevents premature convergence
# Explores hyperparameter space beyond parent combinations`}
      />
      <TextBlock 
        text="Crossover combined parameters from two parent AIs to create offspring: if Parent A had max_depth=8 and Parent B had max_depth=12, the child might inherit max_depth=10 through blend crossover. Mutation introduced random variation, changing parameters within valid ranges to explore new regions of hyperparameter space. This combination of exploitation (preserving good solutions) and exploration (trying new variations) prevented the population from converging prematurely on local optima."
        sectionTitle="Exploitation vs Exploration"
      />
      
      <TextBlock 
        text="The fitness function used log loss (cross-entropy) to evaluate probability calibration rather than simple accuracy. Log loss heavily penalizes confident wrong predictions: predicting 90% fire probability for a no-fire event scores worse than predicting 60% probability. This encouraged AIs to produce well-calibrated probabilities—when the model predicts 70% fire risk, approximately 70% of those predictions should have actual fires. Calibrated probabilities are critical for practical wildfire prediction where decision-makers need accurate risk estimates, not just binary classifications. An AI predicting 95% everywhere would achieve high recall but useless calibration."
        sectionTitle="Fitness Function"
      />
      
      <TextBlock 
        text="Elite preservation ensured the best-performing AI from each generation survived unchanged into the next generation, preventing regression. If Generation 5 produced an excellent model with log loss of 0.23, that exact configuration would persist in Generation 6 even if all its offspring performed worse. This guaranteed monotonic improvement in best fitness over time while allowing the rest of the population to explore aggressively. The elite AI served as a baseline—new configurations had to beat this benchmark to become the new elite, creating competitive pressure that drove optimization."
        sectionTitle="Elite Preservation"
      />
      
      <TextBlock 
        text="The initial population used a hybrid strategy: 5 AIs with smart defaults (max_depth=6, n_estimators=100, learning_rate=0.1, subsample=0.8) and 45 AIs with completely random parameters. Smart defaults provided a quality baseline, ensuring the population started with reasonable models rather than completely random noise. The random configurations enabled exploration of unusual hyperparameter combinations that might outperform conventional wisdom. This balance between informed starting points and exploratory diversity improved convergence speed—early generations had viable models to build on rather than starting from scratch."
        sectionTitle="Population Initialization"
      />
      
      <TextBlock 
        text="Adaptive mutation rates started large in early generations (exploring broadly) and decreased over time (fine-tuning). Generation 1 might mutate parameters by ±50% of their range, while Generation 10 mutated by ±10%. This simulated annealing approach enabled both global exploration and local optimization. Early generations discovered promising hyperparameter regions, while later generations polished those discoveries. The mutation strategy prevented premature convergence—if all AIs clustered around similar parameters by Generation 3, increased mutation spread them back out to explore alternatives."
        sectionTitle="Adaptive Mutation"
      />
      
      <TextBlock 
        text="The convergence strategy combined maximum generation limits (10 generations) with early stopping (halt if no improvement for 3 consecutive generations). This prevented both infinite runtime and premature termination. If the best fitness plateaued at Generation 7, the system would continue through Generations 8 and 9, then stop at Generation 10 when no improvement occurred. The hybrid approach adapted to problem difficulty—easy optimization stopped early (saving computation), while difficult problems used the full generation budget. Estimated runtime of 4-5 hours ensured the evolution could complete overnight without manual intervention."
        sectionTitle="Convergence Control"
      />
    </Article>
  );
};

export default GeneticAlgorithmEvolution;

