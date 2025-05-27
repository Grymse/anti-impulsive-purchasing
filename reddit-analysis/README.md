# Reddit Anti-Consumption Research

Analysis of Reddit discussions related to anti-consumption behaviors and purchasing patterns to inform the design of the *Less* extension.

## Description

This project involves scraping and analyzing Reddit data from relevant subreddits to understand user attitudes, behaviors, and strategies related to consumption reduction. The insights gained help inform the design and effectiveness of anti-impulsive purchasing interventions.

**Note**: AI assistance (LLMs) was used to help generate code for this project.

## Technologies

- **Python**: Data processing and analysis
- **Pandas**: Data manipulation and analysis
- **Jupyter Notebooks**: Interactive analysis and visualization
- **OpenAI API**: LLM-powered content analysis
- **Gemini API**: Alternative LLM for comparison and validation
- **Reddit API**: Data collection from Reddit

## Setup

### Environment Setup
1. Create conda environment:
```bash
conda env create -f env.yml
conda activate reddit
```

2. Create `.env` file with the following variables:
```
CLIENT_ID=<reddit_client_id>
CLIENT_SECRET=<reddit_client_secret>
USERNAME=<reddit_username>
PASSWORD=<reddit_password>
SUBREDDITS='anticonsumption'
SCRAPE_TOP_N_SUBMISSIONS=10
SUBMISSION_TYPE='hot'
SUBMISSIONS_TIME_FILTER='month'
COMMENT_DEPTH=-1

# OpenAI
OPENAI_API_KEY=<your_openai_key>
ASSISTANT_ID=<assistant_id>
```

### Data Structure
Create this folder structure in the project root:
```
data/
├── comment/
├── redditor/
├── scrape/
├── submission/
└── subreddit/
```

## Data Collection

Reddit data can be obtained from [Arctic Shift](https://arctic-shift.photon-reddit.com/download-tool).
All processed data should be saved to the `data_processed/` directory.

## Analysis Components

- **Submission Analysis**: Classification and sentiment analysis of Reddit posts
- **Comment Analysis**: Deep analysis of user discussions and advice
- **Embedding Analysis**: Vector representations for clustering and similarity
- **Manual Labeling**: Human validation of automated classifications
- **Comparative Analysis**: Multi-LLM comparison for validation
