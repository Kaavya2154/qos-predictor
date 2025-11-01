#!/bin/bash

# Colors for terminal output
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${BLUE}=== QoS Predictor Application ===${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed. Please install Python 3 and try again.${NC}"
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
pip install -r requirements.txt

# Train the model if it doesn't exist
if [ ! -f "backend/models/qos_model.pkl" ]; then
    echo -e "${YELLOW}Training QoS prediction model...${NC}"
    python train_model.py
fi

# Start the backend server
echo -e "${GREEN}Starting backend server...${NC}"
python backend/app.py &
BACKEND_PID=$!

# Wait for backend to start
echo -e "${YELLOW}Waiting for backend to start...${NC}"
sleep 3

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Warning: Node.js is not installed. Cannot start frontend.${NC}"
    echo -e "${YELLOW}Backend is running at http://localhost:5000${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    wait $BACKEND_PID
else
    # Navigate to frontend directory and start the development server
    echo -e "${GREEN}Starting frontend development server...${NC}"
    cd frontend
    npm install
    npm start &
    FRONTEND_PID=$!
    
    echo -e "${GREEN}Application is running!${NC}"
    echo -e "${YELLOW}Backend: http://localhost:5000${NC}"
    echo -e "${YELLOW}Frontend: http://localhost:3000${NC}"
    echo -e "${YELLOW}Press Ctrl+C to stop the servers${NC}"
    
    # Wait for both processes
    wait $BACKEND_PID $FRONTEND_PID
fi