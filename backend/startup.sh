#!/bin/bash

# Print debug information
echo "Starting application..."
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Start the application with error logging
echo "Starting Gunicorn..."
exec gunicorn main:app --bind=0.0.0.0 --timeout 600 --workers 4 --log-level debug --error-logfile - --access-logfile - 