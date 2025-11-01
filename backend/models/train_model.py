import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os
import sys

# Add parent directory to path to import utils
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.data_processor import generate_sample_data

def train_qos_model(n_samples=1000, test_size=0.2, random_state=42):
    """
    Train a QoS prediction model using Random Forest Regressor.
    
    Parameters:
    n_samples (int): Number of samples to generate for training
    test_size (float): Proportion of data to use for testing
    random_state (int): Random seed for reproducibility
    
    Returns:
    tuple: (model, test_score) - the trained model and its R^2 score on test data
    """
    print("Generating sample data...")
    X, y = generate_sample_data(n_samples)
    
    print(f"Data shape: X={X.shape}, y={y.shape}")
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )
    
    print("Training QoS prediction model...")
    
    # Initialize and train the model
    model = RandomForestRegressor(n_estimators=100, random_state=random_state)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred, multioutput='raw_values')
    r2 = r2_score(y_test, y_pred, multioutput='raw_values')
    
    print("Model evaluation:")
    metrics = ['Latency', 'Jitter', 'Packet Loss', 'Throughput']
    for i, metric in enumerate(metrics):
        print(f"{metric}: MSE = {mse[i]:.4f}, R² = {r2[i]:.4f}")
    
    # Save the model
    model_path = os.path.join(os.path.dirname(__file__), 'qos_model.pkl')
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")
    
    return model, np.mean(r2)

if __name__ == "__main__":
    train_qos_model()