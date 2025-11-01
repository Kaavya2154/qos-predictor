# QoS Predictor

A web application for predicting Quality of Service (QoS) metrics in networks using machine learning.

## Features

- Machine learning model for QoS prediction
- Interactive frontend for data input and visualization
- Real-time QoS metric predictions
- Data visualization for network performance metrics

## Project Structure

```
├── backend/              # Flask backend API
│   ├── app.py            # Main application file
│   ├── models/           # ML models
│   └── utils/            # Utility functions
├── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/              # Source files
├── data/                 # Sample data for training
└── requirements.txt      # Python dependencies
```

## Setup

### Backend

1. Create a virtual environment: `python -m venv venv`
2. Activate the virtual environment: 
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the backend: `python backend/app.py`

### Frontend

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Input network parameters in the form
3. View the predicted QoS metrics and visualizations