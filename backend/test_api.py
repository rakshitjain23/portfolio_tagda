#!/usr/bin/env python3
"""
Simple test script for the Portfolio API
Run this to verify all endpoints are working correctly
"""

import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:8000"

def test_root_endpoint():
    """Test the root endpoint"""
    print("Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint working: {data['message']}")
            return True
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def test_health_endpoint():
    """Test the health check endpoint"""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check working: {data['status']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_contact_endpoint():
    """Test the contact form endpoint"""
    print("Testing contact endpoint...")
    try:
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message from the API test script."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Contact endpoint working: {data['message']}")
            return True
        else:
            print(f"❌ Contact endpoint failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Contact endpoint error: {e}")
        return False

def test_chat_endpoint():
    """Test the chat endpoint"""
    print("Testing chat endpoint...")
    try:
        chat_data = {
            "message": "Tell me about your skills"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json=chat_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chat endpoint working: {data['type']}")
            print(f"Response preview: {data['response'][:100]}...")
            return True
        else:
            print(f"❌ Chat endpoint failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Chat endpoint error: {e}")
        return False

def test_docs_endpoint():
    """Test the API documentation endpoint"""
    print("Testing docs endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/docs")
        if response.status_code == 200:
            print("✅ API documentation available at /docs")
            return True
        else:
            print(f"❌ Docs endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Docs endpoint error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Portfolio API Tests")
    print("=" * 50)
    
    tests = [
        test_root_endpoint,
        test_health_endpoint,
        test_contact_endpoint,
        test_chat_endpoint,
        test_docs_endpoint
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
        time.sleep(0.5)  # Small delay between tests
    
    print("=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the errors above.")
    
    print("\n📖 API Documentation available at:")
    print(f"   {BASE_URL}/docs")
    print(f"   {BASE_URL}/redoc")

if __name__ == "__main__":
    main() 