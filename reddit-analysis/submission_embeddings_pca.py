import json
import pandas as pd
from tqdm import tqdm
from sklearn import decomposition
from sentence_transformers import SentenceTransformer


LOCATION_PROCESSED = 'data_processed'
LOCATION_DATA = 'data'
ALL_SUBMISSIONS_FILENAME = f"{LOCATION_PROCESSED}/all_submissions_filtered_and_labelled_shopaholic.jsonl"
FILENAME_PRECALCULATED = f"{LOCATION_DATA}/all_submissions_filtered_and_labbelled_and_embedded.jsonl"
DEVICE = "mps"
KEEP_VARIANCE = 0.95

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


print("Counting lines of input file to get n...")
with open(ALL_SUBMISSIONS_FILENAME, 'r') as lines:
    n = len(lines.readlines())
print(f"Data loaded. n={n}")

print("Loading model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device=DEVICE)
print("Model loaded.")

rows = []
print("Calculating embeddings...")
try:
    with open(ALL_SUBMISSIONS_FILENAME, 'r') as lines:
        with open(f"{LOCATION_DATA}/all_submissions_filtered_and_labbelled_and_embedded.jsonl", 'w') as f:
            for line in tqdm(lines, total=n):
                row = json.loads(line)
                submission_id = row['id']

                if submission_id in precalculated_embeddings:
                    embedding = precalculated_embeddings[submission_id]
                    del precalculated_embeddings[submission_id]
                else:
                    submission_text = f"{row['title']}"

                    flair = row['link_flair_text']
                    if not pd.isna(flair) and flair != "[deleted]" and flair != "[removed]":
                        submission_text += f"\n{flair}"

                    selftext = row['selftext']
                    if not pd.isna(selftext) and selftext != "[deleted]" and selftext != "[removed]":
                        submission_text += f"\n{selftext}"
                    embedding = model.encode(submission_text, device=DEVICE).tolist()
                    
                row['embedding'] = embedding
                f.write(f"{json.dumps(row)}\n")
                rows.append(row)

    print("Embeddings calculated.")
except Exception as e:
    print(f"Error: {e}")

print("Fitting PCA...")
pca = decomposition.PCA(n_components=KEEP_VARIANCE, random_state=42)
pca.fit([row['embedding'] for row in rows])
print(f"PCA fitted. Keeping n components {len(pca.components_)} and {KEEP_VARIANCE*100}% variance.")

print("Transforming embeddings...")
try:
    with open(f"{LOCATION_PROCESSED}/all_submissions_filtered_and_labbelled_and_embedded_pca.jsonl", 'w') as f:
        for row in tqdm(rows, total=len(rows)):
            embedding = row['embedding']
            transformed = pca.transform([embedding])
            # delete the original embedding to save space
            row['embedding'] = transformed.tolist()[0]
            f.write(f"{json.dumps(row)}\n")
    print("Embeddings transformed.")
except Exception as e:
    print(f"Error: {e}")