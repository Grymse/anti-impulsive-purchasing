# Survey Analysis

Analysis of survey responses collected from users about their purchasing behaviors, strategies, and attitudes towards consumption reduction.

## Description

This folder contains analysis scripts and notebooks for processing and analyzing survey data collected as part of the MSc thesis research. The analysis examines user demographics, purchasing patterns, effectiveness of different strategies, and relationships between various behavioral factors.

**Note**: AI assistance (LLMs) was used to generate code for this project.

## Technologies

- **Python**: Data processing and statistical analysis
- **Pandas**: Data manipulation and analysis
- **Jupyter Notebooks**: Interactive analysis and visualization
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine learning and clustering analysis
- **Statistical Analysis**: Correlation analysis, regression, and hypothesis testing

## Key Analysis Areas

- **Demographic Analysis**: Age, gender, employment, and geographic distribution
- **Strategy Effectiveness**: Analysis of which anti-consumption strategies work best
- **Behavioral Patterns**: Purchase frequency, regret patterns, and help-seeking behavior
- **Feature Engineering**: Creating predictive models for purchasing resistance
- **Clustering Analysis**: Identifying user archetypes and behavior patterns
- **Statistical Testing**: Validating hypotheses about intervention effectiveness

## Data Files

- **`data_processed/`**: Contains processed survey responses and analysis outputs
- **`plots/`**: Generated visualizations and charts
- **Survey Data**: Demographics, purchasing behaviors, and strategy preferences
- **Processed Features**: Engineered features for machine learning analysis

## Setup

1. Create conda environment:
```bash
conda env create -f env.yml
conda activate antic
```

2. Run analysis notebooks in order:
   - `process_survey.ipynb` - Initial data processing
   - `first_page_graphs.ipynb` - Demographic visualizations
   - `effective_strategies_graphs.ipynb` - Strategy analysis
