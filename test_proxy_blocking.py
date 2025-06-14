#!/usr/bin/env python3
"""
Test script to verify proxy blocking is working
"""

import requests
import json

# Backend URL
BACKEND_URL = "https://portfolio-tagda.onrender.com"

def test_proxy_headers():
    """Test with proxy headers to verify blocking"""
    print("🔍 Testing Proxy Header Blocking...")
    
    # Test with X-Forwarded-For header (like the proxy)
    headers = {
        "X-Forwarded-For": "192.168.1.1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(f"{BACKEND_URL}/", headers=headers, timeout=10)
        print(f"   X-Forwarded-For header: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")
        if response.status_code == 403:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   Error: {e}")

def test_rtucommunity_domain():
    """Test with rtucommunity.tech domain in headers"""
    print("\n🔍 Testing rtucommunity.tech Domain Blocking...")
    
    headers = {
        "Origin": "https://testing.rtucommunity.tech",
        "Referer": "https://testing.rtucommunity.tech/",
        "Host": "testing.rtucommunity.tech",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(f"{BACKEND_URL}/", headers=headers, timeout=10)
        print(f"   rtucommunity.tech headers: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")
        if response.status_code == 403:
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   Error: {e}")

def test_legitimate_request():
    """Test legitimate request to ensure it still works"""
    print("\n🔍 Testing Legitimate Request...")
    
    headers = {
        "Origin": "https://devrakshit.me",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(f"{BACKEND_URL}/", headers=headers, timeout=10)
        print(f"   Legitimate request: {response.status_code} - {'✅ ALLOWED' if response.status_code == 200 else '❌ BLOCKED'}")
    except Exception as e:
        print(f"   Error: {e}")

def test_api_endpoints():
    """Test API endpoints with and without API key"""
    print("\n🔍 Testing API Endpoints...")
    
    # Test without API key (should be blocked)
    try:
        response = requests.post(f"{BACKEND_URL}/api/contact", json={
            "name": "Test",
            "email": "test@example.com",
            "message": "Test message"
        }, timeout=10)
        print(f"   Contact API without key: {response.status_code} - {'✅ BLOCKED' if response.status_code == 401 else '❌ ALLOWED'}")
    except Exception as e:
        print(f"   Error: {e}")

def main():
    print("🛡️ PROXY BLOCKING VERIFICATION TEST")
    print("=" * 50)
    
    test_proxy_headers()
    test_rtucommunity_domain()
    test_legitimate_request()
    test_api_endpoints()
    
    print("\n🎯 Test completed!")
    print("\n📊 Expected Results:")
    print("   ✅ Proxy headers should be BLOCKED (403)")
    print("   ✅ rtucommunity.tech should be BLOCKED (403)")
    print("   ✅ Legitimate requests should be ALLOWED (200)")
    print("   ✅ API without key should be BLOCKED (401)")

if __name__ == "__main__":
    main() 