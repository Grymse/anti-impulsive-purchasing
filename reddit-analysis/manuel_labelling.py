import pandas as pd

# Load the dataset
file_path = './data_processed/r_frugal_posts_comparison.csv'  # Update with the actual path
df = pd.read_csv(file_path)

def manual_label(df, n):
    """
    This function allows manual labeling of the first n submissions' 'is_advice_seeking' column.
    """
    for i in range(min(n, len(df))):  # Ensures n does not exceed total rows
        submission = df.iloc[i]
        
        # Display submission details for the user to consider
        print(f"Submission {i + 1}:")
        print(f"Author: {submission['author']}")
        print(f"Title: {submission['selftext']}")
        print("Please label this submission as:")
        print("1 - Seeking advice, 0 - Not seeking advice, -1 - Undecided")
        
        # Get user input for labeling
        while True:
            try:
                label = int(input("Enter 1, 0, or -1: ").strip())
                if label in [1, 0, -1]:
                    df.at[i, 'is_advice_seeking'] = label  # Update the label
                    break
                else:
                    print("Invalid input. Please enter 1, 0, or -1.")
            except ValueError:
                print("Invalid input. Please enter a valid integer (1, 0, or -1).")
        
        print(f"Submission {i + 1} labeled as: {df.at[i, 'is_advice_seeking']}\n")
    
    return df

# Specify how many submissions you want to label
n = int(input("How many submissions do you want to label? "))

# Run the manual labeling process
df_labeled = manual_label(df, n)

# Save the labeled file
output_file_path = './data_processed/manually_labeled_data'  # Update with the desired output path
df_labeled.to_csv(output_file_path, index=False)

print(f"Labeled data saved to {output_file_path}")
