# Modal Influence Analysis: Does the anti-impulse modal affect purchase behavior?
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Get sessions with checkout visits
checkout_sessions_list = checkout_df['session_id'].unique()

# Filter for sessions where modal was shown
modal_sessions_list = modal_df['session_id'].unique()

# Get sessions with purchases
purchase_sessions_list = purchase_df['session_id'].unique()

# Count conversions
with_modal_sessions = set(checkout_sessions_list).intersection(set(modal_sessions_list))
without_modal_sessions = set(checkout_sessions_list) - set(modal_sessions_list)

# Count purchases in each group
purchases_with_modal = len(set(with_modal_sessions).intersection(set(purchase_sessions_list)))
purchases_without_modal = len(set(without_modal_sessions).intersection(set(purchase_sessions_list)))

# Calculate conversion rates
modal_conversion_rate = purchases_with_modal / len(with_modal_sessions) if len(with_modal_sessions) > 0 else 0
no_modal_conversion_rate = purchases_without_modal / len(without_modal_sessions) if len(without_modal_sessions) > 0 else 0

print("\nModal Influence Analysis:")
print(f"Checkout sessions with modal shown: {len(with_modal_sessions)}")
print(f"Checkout sessions without modal: {len(without_modal_sessions)}")
print(f"Purchases from sessions with modal: {purchases_with_modal}")
print(f"Purchases from sessions without modal: {purchases_without_modal}")
print(f"Purchase conversion rate with modal: {modal_conversion_rate:.2%}")
print(f"Purchase conversion rate without modal: {no_modal_conversion_rate:.2%}")
print(f"Difference: {(modal_conversion_rate - no_modal_conversion_rate):.2%}")

# Create comparison bar chart
plt.figure(figsize=(10, 6))
conversion_data = [no_modal_conversion_rate * 100, modal_conversion_rate * 100]
labels = ['Without Anti-Impulse Modal', 'With Anti-Impulse Modal']
colors = ['#1f77b4', '#d62728']

bars = plt.bar(labels, conversion_data, color=colors, width=0.6)
plt.title('Purchase Conversion Rate: Effect of Anti-Impulse Modal', fontsize=16)
plt.ylabel('Checkout to Purchase Conversion Rate (%)', fontsize=14)
plt.grid(axis='y', linestyle='--', alpha=0.3)

# Add the values on top of the bars
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.5,
            f'{height:.1f}%',
            ha='center', va='bottom', fontsize=12)

plt.tight_layout()
plt.show()

# Additional analysis: Time from modal to purchase
if len(modal_df) > 0 and len(purchase_df) > 0:
    # Get sessions with both modal and purchase
    dual_sessions = set(modal_sessions_list).intersection(set(purchase_sessions_list))
    
    if len(dual_sessions) > 0:
        print(f"\nAnalyzing {len(dual_sessions)} sessions with both modal display and purchase:")
        
        # Create a dataframe to track time from modal to purchase
        modal_to_purchase_times = []
        
        for session in dual_sessions:
            # Get modal timestamp
            session_modals = modal_df[modal_df['session_id'] == session]
            first_modal_time = session_modals['created_at'].min()
            
            # Get purchase timestamp 
            session_purchases = purchase_df[purchase_df['session_id'] == session]
            purchase_time = session_purchases['created_at'].min()
            
            # Calculate time difference in seconds
            time_diff = (purchase_time - first_modal_time).total_seconds()
            
            modal_to_purchase_times.append({
                'session_id': session,
                'modal_time': first_modal_time,
                'purchase_time': purchase_time,
                'seconds_to_purchase': time_diff,
                'minutes_to_purchase': time_diff / 60
            })
        
        # Create DataFrame
        time_diff_df = pd.DataFrame(modal_to_purchase_times)
        
        # Calculate statistics
        avg_minutes = time_diff_df['minutes_to_purchase'].mean()
        median_minutes = time_diff_df['minutes_to_purchase'].median()
        
        print(f"Average time from modal to purchase: {avg_minutes:.2f} minutes")
        print(f"Median time from modal to purchase: {median_minutes:.2f} minutes")
        
        # Plot the distribution of times
        plt.figure(figsize=(12, 6))
        
        # Filter out extreme outliers for better visualization
        filtered_times = time_diff_df[time_diff_df['minutes_to_purchase'] < 60]  # Filter times > 1 hour
        
        sns.histplot(filtered_times['minutes_to_purchase'], kde=True, color='#d62728')
        plt.axvline(x=avg_minutes, color='black', linestyle='--', label=f'Mean: {avg_minutes:.2f} min')
        plt.axvline(x=median_minutes, color='green', linestyle='-.', label=f'Median: {median_minutes:.2f} min')
        
        plt.title('Time from Anti-Impulse Modal to Purchase', fontsize=16)
        plt.xlabel('Minutes', fontsize=14)
        plt.ylabel('Frequency', fontsize=14)
        plt.legend()
        plt.grid(True, linestyle='--', alpha=0.3)
        plt.tight_layout()
        plt.show()
