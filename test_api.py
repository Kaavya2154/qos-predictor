import requests
import json

def test_health_endpoint():
    try:
        response = requests.get('http://localhost:5000/api/health')
        print(f"Health endpoint status code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error checking health endpoint: {e}")
        return False

def test_predict_endpoint():
    try:
        # Sample data for prediction
        data = {
            "bandwidth": 100,
            "network_load": 50,
            "packet_size": 1500,
            "distance": 10,
            "hop_count": 5,
            "protocol": "TCP",
            "time_of_day": 12,
            "network_type": "Fiber"
        }
        
        response = requests.post('http://localhost:5000/api/predict', json=data)
        print(f"Predict endpoint status code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing predict endpoint: {e}")
        return False

if __name__ == "__main__":
    print("Testing API endpoints...")
    health_ok = test_health_endpoint()
    predict_ok = test_predict_endpoint()
    
    if health_ok and predict_ok:
        print("\nAPI is working correctly!")
    else:
        print("\nAPI has issues. Check the logs above.")