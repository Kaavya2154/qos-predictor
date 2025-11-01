from flask import Flask, request, jsonify, make_response
import numpy as np
import pandas as pd
import joblib
import os
import json
from utils.data_processor import preprocess_data

app = Flask(__name__)

# Handle CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Check if model exists, otherwise use a placeholder
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models/qos_model.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Preprocess the input data
        processed_data = preprocess_data(data)
        
        # Check if model exists
        if os.path.exists(MODEL_PATH):
            # Load the model
            model = joblib.load(MODEL_PATH)
            
            # Make prediction
            prediction = model.predict(processed_data)
            
            # Convert prediction to dictionary for consistent format
            prediction_list = {
                'latency': float(prediction[0][0]),
                'jitter': float(prediction[0][1]),
                'packet_loss': float(prediction[0][2]),
                'throughput': float(prediction[0][3])
            }
        else:
            # If model doesn't exist yet, return placeholder predictions
            # This is just for development purposes
            prediction_list = {
                'latency': np.random.uniform(10, 100),
                'jitter': np.random.uniform(1, 20),
                'packet_loss': np.random.uniform(0, 5),
                'throughput': np.random.uniform(1, 100)
            }
        
        return jsonify({
            'success': True,
            'prediction': prediction_list
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/train', methods=['POST'])
def train():
    # This would be implemented to train or retrain the model
    # For now, it's a placeholder
    return jsonify({
        'success': True,
        'message': 'Model training initiated'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': os.path.exists(MODEL_PATH)
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)