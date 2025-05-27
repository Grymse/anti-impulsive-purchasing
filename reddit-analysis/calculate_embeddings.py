import json
import pandas as pd
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

LOCATION_DATA = 'data'
LOCATION_PROCESSED = 'data_processed'
FILENAME = f"{LOCATION_PROCESSED}/all_comments_used.jsonl"
FILENAME_PRECALCULATED = f"{LOCATION_DATA}/all_comments_embeddings_old.jsonl"
DEVICE = "mps"

def calculate_embedding(model, comment):
    return model.encode(comment, device=DEVICE).tolist()

print("Loading model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device=DEVICE)
print("Model loaded.")

print("Loading precalculated embeddings to get n...")
with open(FILENAME_PRECALCULATED, 'r') as lines:
    n_precalculated = len(lines.readlines())
print(f"Precalculated embeddings loaded. n={n_precalculated}")

precalculated_embeddings = {}
print("Loading precalculated embeddings into memory...")
try:
    with open(FILENAME_PRECALCULATED, 'r') as lines:
        for line in tqdm(lines, total=n_precalculated):
            row = json.loads(line)
            precalculated_embeddings[row['id']] = row['embedding']
except Exception as e:
    print(f"Error: {e}")
print("Precalculated embeddings loaded.")

print("Loading data to get n...")
with open(FILENAME, 'r') as lines:
    n = len(lines.readlines())
print(f"Data loaded. n={n}")

print("Calculating embeddings...")
try:
    with open(FILENAME, 'r') as lines:
        with open(f"{LOCATION_PROCESSED}/all_comments_embeddings.jsonl", 'w') as f:
            for line in tqdm(lines, total=n):
                row = json.loads(line)

                comment_id = row['id']

                if comment_id in precalculated_embeddings:
                    embedding = precalculated_embeddings[comment_id]
                    # delete the precalculated embedding to save memory
                    del precalculated_embeddings[comment_id]
                else:
                    comment = row['body']
                    embedding = calculate_embedding(model, comment)
                
                row['embedding'] = embedding
                f.write(f"{json.dumps(row)}\n")

    print("Embeddings calculated.")
except Exception as e:
    print(f"Error: {e}")