import os
import sys

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

# Import the train_model function from the models module
from models.train_model import train_qos_model

def main():
    print("Training QoS prediction model...")
    model, score = train_qos_model(n_samples=1000)
    print(f"Model training completed with average R² score: {score:.4f}")
    print("You can now run the backend API with 'python backend/app.py'")

if __name__ == "__main__":
    main()