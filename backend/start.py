#!/usr/bin/env python3
"""
Startup script for the Portfolio API
Provides different options for running the server
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

def run_development():
    """Run the server in development mode with auto-reload"""
    print("🚀 Starting Portfolio API in development mode...")
    print("📖 API Documentation will be available at: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 60)
    
    try:
        subprocess.run([
            "uvicorn", "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

def run_production():
    """Run the server in production mode with gunicorn"""
    print("🚀 Starting Portfolio API in production mode...")
    print("📖 API Documentation will be available at: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 60)
    
    try:
        subprocess.run([
            "gunicorn", "main:app",
            "-w", "4",
            "-k", "uvicorn.workers.UvicornWorker",
            "--bind", "0.0.0.0:8000",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

def run_tests():
    """Run the API tests"""
    print("🧪 Running API tests...")
    try:
        subprocess.run([sys.executable, "test_api.py"])
    except Exception as e:
        print(f"❌ Error running tests: {e}")

def check_dependencies():
    """Check if all required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    required_packages = [
        "fastapi",
        "uvicorn",
        "pydantic",
        "requests",
        "python-dotenv",
        "email-validator",
        "gunicorn"
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package.replace("-", "_"))
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - MISSING")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n⚠️  Missing packages: {', '.join(missing_packages)}")
        print("💡 Run: pip install -r requirements.txt")
        return False
    else:
        print("\n✅ All dependencies are installed!")
        return True

def check_environment():
    """Check if environment variables are set up"""
    print("🔍 Checking environment variables...")
    
    env_file = Path(".env")
    if env_file.exists():
        print("✅ .env file found")
        return True
    else:
        print("⚠️  .env file not found")
        print("💡 Create a .env file with the required environment variables")
        print("📖 See README.md for the required variables")
        return False

def main():
    """Main function with command line argument parsing"""
    parser = argparse.ArgumentParser(description="Portfolio API Startup Script")
    parser.add_argument(
        "mode", 
        choices=["dev", "prod", "test", "check"],
        help="Mode to run the server in"
    )
    
    args = parser.parse_args()
    
    print("🎯 Portfolio API Startup Script")
    print("=" * 50)
    
    if args.mode == "check":
        print("🔍 Running system checks...")
        deps_ok = check_dependencies()
        env_ok = check_environment()
        
        if deps_ok and env_ok:
            print("\n✅ System is ready to run!")
        else:
            print("\n⚠️  Please fix the issues above before running the server")
            sys.exit(1)
    
    elif args.mode == "test":
        if not check_dependencies():
            print("❌ Dependencies not met. Please install them first.")
            sys.exit(1)
        run_tests()
    
    elif args.mode == "dev":
        if not check_dependencies():
            print("❌ Dependencies not met. Please install them first.")
            sys.exit(1)
        run_development()
    
    elif args.mode == "prod":
        if not check_dependencies():
            print("❌ Dependencies not met. Please install them first.")
            sys.exit(1)
        run_production()

if __name__ == "__main__":
    main() 