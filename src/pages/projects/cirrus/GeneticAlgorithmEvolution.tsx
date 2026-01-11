import Article from '../../../components/article/Article';
import TitleBlock from '../../../components/article/TitleBlock';
import TextBlock from '../../../components/article/TextBlock';
import CodeBlock from '../../../components/article/CodeBlock';

const GeneticAlgorithmEvolution = () => {
  return (
    <Article>
      <TitleBlock title="Genetic Algorithm Evolution" />
      <TextBlock 
        text="I created 50 XGBoost AIs that compete. Top 5 survive (elite preservation). Crossover blends hyperparameters. Mutation explores new configs. Log loss fitness encourages calibrated probabilities."
        sectionTitle="Overview" 
      />
      <TextBlock 
        text="My Cirrus AI system used genetic algorithms to evolve optimal wildfire prediction models rather than hand-tuning hyperparameters or using grid search. Each AI in the population was an XGBoost classifier with unique hyperparameters: max_depth (3-15), n_estimators (50-500), learning_rate (0.01-0.3), subsample ratios, regularization values. The population of 50 AI models competed on the same prediction tasks, with fitness measured by log loss on wildfire predictions. Top performers survived to the next generation, while poor performers were eliminated. This evolutionary approach explored hyperparameter space more efficiently than exhaustive search while discovering configurations optimized specifically for the wildfire prediction task."
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
      <TextBlock 
        text="Crossover enabled exploration of hyperparameter combinations that blended successful strategies from different AIs. If one AI excelled with deep trees (max_depth=12) and another with aggressive learning (learning_rate=0.2), crossover could produce offspring with both traits. This genetic mixing found combinations that individual random search would miss."
        sectionTitle="Genetic Mixing"
      />
      <TextBlock 
        text="Mutation added random variation to prevent convergence on local optima. Even the top 5 survivors could produce mutated offspring that explored nearby hyperparameter regions. Mutation rates were carefully tuned—too low and the population stagnated, too high and good configurations were lost. I used 10% mutation rate per hyperparameter, balancing exploration (finding new configurations) with exploitation (refining successful ones)."
        sectionTitle="Mutation Strategy"
      />
      <TextBlock 
        text="The fitness function used log loss rather than simple accuracy because wildfire prediction needed well-calibrated probability estimates, not just binary yes/no classifications. An AI predicting '80% chance of wildfire' should be correct roughly 80% of the time when it makes that prediction. Log loss penalizes poorly calibrated predictions heavily, encouraging AIs to output realistic probability distributions rather than overconfident guesses. This made the evolved AIs more useful for risk assessment than accuracy-optimized models."
        sectionTitle="Calibrated Predictions"
      />
      <TextBlock 
        text="The evolutionary approach demonstrated a key advantage over grid search: efficiency through competition. Grid search tests every combination exhaustively—with 7 hyperparameters each having 10 possible values, that's 10^7 = 10 million configurations to test. Genetic algorithms tested only ~2,000 configurations across 40 generations but found near-optimal solutions by focusing search on promising regions. The population naturally converged on successful hyperparameter ranges while abandoning poor configurations early."
        sectionTitle="Efficient Search"
      />
      
      <TextBlock 
        text="This genetic algorithm implementation demonstrates my understanding of evolutionary optimization techniques for ML hyperparameter tuning. The system tested ~2,000 configurations instead of 10 million, achieving near-optimal results through intelligent search. The elite preservation, crossover, and mutation operators show understanding of evolutionary algorithms beyond basic implementation. The log loss fitness function demonstrates awareness that different metrics matter for different problems (calibrated probabilities vs. accuracy). This work shows ML engineering skills: hyperparameter optimization, evolutionary algorithms, and understanding when to use advanced techniques vs. simpler approaches."
        sectionTitle="Professional Value"
      />
    </Article>
  );
};

export default GeneticAlgorithmEvolution;
