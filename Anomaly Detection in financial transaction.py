#!/usr/bin/env python
# coding: utf-8

# In[3]:


import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

# Generate synthetic financial transaction data
data = {
    "transaction_id": np.arange(1, 101),
    "amount": np.random.normal(100, 50, 100),  # Normal transactions
    "time": np.random.randint(0, 24, 100),  # Hour of transaction
    "frequency": np.random.randint(1, 10, 100)
}

# Convert dictionary to DataFrame
df = pd.DataFrame(data)

# Introduce some anomalies
anomaly_indices = np.random.choice(df.index, 5, replace=False)
df.loc[anomaly_indices, "amount"] = np.random.normal(1000, 200, 5)

# Prepare the feature set
features = ["amount", "time", "frequency"]
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[features])

# Apply Isolation Forest
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
df["anomaly_score"] = model.fit_predict(df_scaled)

df["is_anomaly"] = df["anomaly_score"].apply(lambda x: "Yes" if x == -1 else "No")

# Display anomalies
anomalies = df[df["is_anomaly"] == "Yes"]
print("Detected Anomalies:")
print(anomalies)

