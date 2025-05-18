#!/bin/bash

echo "Starting BidBees Admin Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v18+ to run this application."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Node.js version $NODE_VERSION detected. Please use Node.js v18+ to run this application."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies."
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating default .env file..."
    echo "VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYmlkYmVlcyIsImEiOiJjbWFpc3R6MXowbTI0MmtzM2lyYXNsdGtqIn0.Y2QtJu8_htStL70kUB95mg" > .env
    echo "MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYmlkYmVlcyIsImEiOiJjbWFpc3R6MXowbTI0MmtzM2lyYXNsdGtqIn0.Y2QtJu8_htStL70kUB95mg" >> .env
    echo "SESSION_SECRET=admin-dashboard-local-dev-secret" >> .env
    echo "NODE_ENV=development" >> .env
fi

# Start the development server
echo "Starting development server..."
npm run dev