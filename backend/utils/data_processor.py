import numpy as np
import pandas as pd

def preprocess_data(data):
    """
    Preprocess input data for QoS prediction.
    
    Parameters:
    data (dict): Input data containing network parameters
    
    Returns:
    numpy.ndarray: Processed data ready for model prediction
    """
    # Protocol encoding
    protocol_mapping = {
        'TCP': 0,
        'UDP': 1,
        'HTTP': 2,
        'HTTPS': 3,
        'FTP': 4
    }
    
    # Network type encoding
    network_type_mapping = {
        'Fiber': 0,
        'Cable': 1,
        'DSL': 2,
        'Wireless': 3,
        '4G': 4
    }
    
    # Convert string values to numeric
    protocol_value = data.get('protocol', 'TCP')
    if isinstance(protocol_value, str):
        protocol_value = protocol_mapping.get(protocol_value, 0)
    
    network_type_value = data.get('network_type', 'Fiber')
    if isinstance(network_type_value, str):
        network_type_value = network_type_mapping.get(network_type_value, 0)
    
    # Extract features from input data
    features = [
        float(data.get('bandwidth', 0)),        # Bandwidth in Mbps
        float(data.get('network_load', 0)),      # Network load percentage
        float(data.get('packet_size', 0)),       # Packet size in bytes
        float(data.get('distance', 0)),          # Distance in km
        float(data.get('hop_count', 0)),         # Number of network hops
        float(protocol_value),                   # Protocol type (encoded)
        float(data.get('time_of_day', 0)),       # Time of day (encoded)
        float(network_type_value)                # Network type (encoded)
    ]
    
    # Convert to numpy array
    features_array = np.array(features, dtype=float).reshape(1, -1)
    
    # Normalize features (this would be replaced with actual scaler in production)
    # For now, we'll just do a simple min-max scaling
    normalized_features = features_array / np.array([1000, 100, 1500, 1000, 20, 5, 24, 5])
    
    return normalized_features

def generate_sample_data(n_samples=100):
    """
    Generate sample data for training the QoS prediction model.
    
    Parameters:
    n_samples (int): Number of samples to generate
    
    Returns:
    tuple: (X, y) where X is the feature matrix and y is the target matrix
    """
    # Generate random features
    bandwidth = np.random.uniform(10, 1000, n_samples)  # Bandwidth in Mbps
    network_load = np.random.uniform(5, 95, n_samples)  # Network load percentage
    packet_size = np.random.uniform(64, 1500, n_samples)  # Packet size in bytes
    distance = np.random.uniform(1, 1000, n_samples)  # Distance in km
    hop_count = np.random.randint(1, 20, n_samples)  # Number of network hops
    protocol = np.random.randint(0, 5, n_samples)  # Protocol type (encoded)
    time_of_day = np.random.uniform(0, 24, n_samples)  # Time of day (hours)
    network_type = np.random.randint(0, 5, n_samples)  # Network type (encoded)
    
    # Combine features
    X = np.column_stack([
        bandwidth, network_load, packet_size, distance,
        hop_count, protocol, time_of_day, network_type
    ])
    
    # Generate target variables (QoS metrics)
    # These formulas are simplified and would be replaced by actual ML models
    latency = 5 + 0.01 * distance + 0.1 * hop_count + 0.05 * network_load + np.random.normal(0, 5, n_samples)
    jitter = 1 + 0.005 * network_load + 0.01 * hop_count + np.random.normal(0, 1, n_samples)
    packet_loss = 0.1 + 0.01 * network_load + 0.005 * hop_count + np.random.normal(0, 0.5, n_samples)
    throughput = bandwidth * (1 - network_load/100) * (1 - packet_loss/100) + np.random.normal(0, 10, n_samples)
    
    # Ensure values are in reasonable ranges
    latency = np.clip(latency, 1, 500)
    jitter = np.clip(jitter, 0, 100)
    packet_loss = np.clip(packet_loss, 0, 100)
    throughput = np.clip(throughput, 0, 1000)
    
    # Combine target variables
    y = np.column_stack([latency, jitter, packet_loss, throughput])
    
    return X, y