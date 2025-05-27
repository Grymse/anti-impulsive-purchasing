import json
import random
import pandas as pd
from tqdm import tqdm
from sklearn import decomposition

N_SAMPLES = 1_000_000
KEEP_VARIANCE = 0.95
N_COMPONENTS = 3

LOCATION_PROCESSED = 'data_processed'
LOCATION_DATA = 'data'
ALL_COMMENTS_FILENAME = f"{LOCATION_DATA}/all_comments_embeddings.jsonl"


print("Counting lines of input file to get n...")
with open(ALL_COMMENTS_FILENAME, 'r') as lines:
    n = len(lines.readlines())
print(f"Data loaded. n={n}")

sample_prob = N_SAMPLES / n

embedding_samples = []

print(f"Sampling {N_SAMPLES} samples from {n} data points with probability {sample_prob}...")
with open(ALL_COMMENTS_FILENAME, 'r') as lines:
    for line in tqdm(lines, total=n):
        if random.random() <= sample_prob:
            row = json.loads(line)
            embedding_samples.append(row["embedding"])
print("Data sampled. Sampled data length:", len(embedding_samples))

print("Fitting PCA...")
pca = decomposition.PCA(n_components=KEEP_VARIANCE, random_state=42)
pca.fit(embedding_samples)
print("PCA fitted.")

print("Deleting samples to free up memory...")
del embedding_samples
print("Samples deleted.")

print("Transforming embeddings...")
try:
    with open(ALL_COMMENTS_FILENAME, 'r') as lines:
        with open(f"{LOCATION_DATA}/all_comments_embeddings_pca.jsonl", 'w') as f_all:
            with open(f"{LOCATION_PROCESSED}/all_comments_embeddings_pca_c{N_COMPONENTS}.jsonl", 'w') as f_small:
                for line in tqdm(lines, total=n):
                    row = json.loads(line)
                    embedding = row['embedding']
                    transformed = pca.transform([embedding])
                    transformed = transformed.tolist()[0]
                    # delete the original embedding to save space
                    row['embedding'] = transformed
                    f_all.write(f"{json.dumps(row)}\n")

                    transformed_small = transformed[:N_COMPONENTS]
                    row['embedding'] = transformed_small
                    f_small.write(f"{json.dumps(row)}\n")
    print("Embeddings transformed.")
except Exception as e:
    print(f"Error: {e}")