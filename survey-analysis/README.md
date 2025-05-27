# reddit anti-consumption research. Analyzing survey data

## DISCLAIMER
We used LLMs to generate code for this project

## Setup a file called .env
Get the values from reddit

```
CLIENT_ID=
CLIENT_SECRET=
USERNAME=
PASSWORD=
SUBREDDITS='anticonsumption'
SCRAPE_TOP_N_SUBMISSIONS=10
SUBMISSION_TYPE='hot'
SUBMISSIONS_TIME_FILTER='month'
COMMENT_DEPTH=-1

# OpenAI
OPENAI_API_KEY=
ASSISTANT_ID=
```

## Create conda environment
Run `conda env create -f env.yml` (takes a long time)...

then run `conda activate antic` or choose the kernal in the specific notebook in vscode (you might need to restart vscode to see it).

If you ever want to add a dependency, simple update the list in the `env.yml` file and run `conda env update -f env.yml`

# File structure
Create this file structure in the root of the repo:
```
- data (this is only required now)
```

# impulse-purchasing
