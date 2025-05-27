import json
import os
import random
import pandas as pd
import umap
from tqdm import tqdm
from sklearn import decomposition
from sentence_transformers import SentenceTransformer


LOCATION_PROCESSED = 'data_processed'
LOCATION_DATA = 'data'
ALL_SUBMISSIONS_EMBEDDINGS_FILENAME = f"{LOCATION_DATA}/all_submissions_filtered_and_labbelled_and_embedded.jsonl"
DEVICE = "mps"
N_COMPONENTS = 3
N_SAMPLES = 10_000

# count available threads
n_threads = os.cpu_count()
print(f"Available threads: {n_threads}")

print("Counting lines of input file to get n...")
with open(ALL_SUBMISSIONS_EMBEDDINGS_FILENAME, 'r') as lines:
    n = len(lines.readlines())
print(f"Data loaded. n={n}")

rows = []
print("Loading data...")
with open(ALL_SUBMISSIONS_EMBEDDINGS_FILENAME, 'r') as f:
    for line in tqdm(f, total=n):
        row = json.loads(line)
        rows.append(row)
print("Data loaded.")

sample_rows = []
prob = N_SAMPLES / n

print(f"Sampling data with a probability of {prob}...")
for row in tqdm(rows, total=n):
    if random.random() <= prob:
        sample_rows.append(row)
print(f"Data sampled. n={len(sample_rows)}")


print("Fitting UMAP...")
reducer = umap.UMAP(n_neighbors=75, n_components=N_COMPONENTS, metric='cosine', n_jobs=n_threads)
sampled_embeddings = [row['embedding'] for row in sample_rows]
reducer.fit(sampled_embeddings)
print(f"UMAP fitted. Keeping n components {N_COMPONENTS}.")

print("Transforming embeddings...")
# use multiprocessing to speed up the process

try:
    with open(f"{LOCATION_PROCESSED}/all_submissions_filtered_and_labbelled_and_embedded_umap.jsonl", 'w') as f:
        for row in tqdm(rows, total=len(rows)):
            embedding = row['embedding']
            transformed = reducer.transform([embedding])
            # delete the original embedding to save space
            row['embedding'] = transformed.tolist()[0]
            f.write(f"{json.dumps(row)}\n")
    print("Embeddings transformed.")
except Exception as e:
    print(f"Error: {e}")