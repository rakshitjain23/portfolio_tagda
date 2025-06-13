#!/bin/bash

# Print current directory and its contents
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Print Python path
echo "Python path:"
python -c "import sys; print('\n'.join(sys.path))"

# Start the application
echo "Starting application..."
gunicorn --bind=0.0.0.0 --timeout 600 main:app --workers 4 --log-level debug 