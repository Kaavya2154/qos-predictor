import requests
import json
import time

def test_api_predict():
    print("Testing API predict endpoint...")
    
    # Test data
    test_data = {
        "bandwidth": 100,
        "network_load": 50,
        "packet_size": 1000,
        "distance": 100,
        "hop_count": 5,
        "protocol": 0,  # TCP
        "time_of_day": 12,
        "network_type": 0  # Fiber
    }
    
    try:
        # Make prediction request
        response = requests.post("http://localhost:5000/api/predict", json=test_data)
        
        # Check response
        if response.status_code == 200:
            result = response.json()
            print("API Response:", json.dumps(result, indent=2))
            
            # Verify prediction structure
            if result.get('success') and 'prediction' in result:
                prediction = result['prediction']
                print("\nPrediction structure check:")
                
                # Check if prediction is a dictionary with expected keys
                expected_keys = ['latency', 'jitter', 'packet_loss', 'throughput']
                missing_keys = [key for key in expected_keys if key not in prediction]
                
                if not missing_keys:
                    print("✅ All expected keys present in prediction")
                    
                    # Check if all values are numbers
                    non_numeric = [key for key, value in prediction.items() 
                                  if not isinstance(value, (int, float))]
                    
                    if not non_numeric:
                        print("✅ All prediction values are numeric")
                    else:
                        print("❌ Some prediction values are not numeric:", non_numeric)
                else:
                    print("❌ Missing expected keys in prediction:", missing_keys)
            else:
                print("❌ Prediction data not found in response")
        else:
            print(f"❌ API request failed with status code {response.status_code}")
            print("Response:", response.text)
    except Exception as e:
        print(f"❌ Error testing API: {str(e)}")

def main():
    print("=== QoS Predictor API Test ===\n")
    
    # Test API predict endpoint
    test_api_predict()
    
    print("\nTest completed.")

if __name__ == "__main__":
    main()