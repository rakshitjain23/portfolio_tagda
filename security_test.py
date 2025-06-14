#!/usr/bin/env python3
"""
Comprehensive Security Test for Portfolio API
Tests various attack vectors and bypass attempts
"""

import requests
import json
import time
from urllib.parse import urljoin

# Backend URL
BACKEND_URL = "https://portfolio-tagda.onrender.com"

def test_cors_bypass():
    """Test CORS bypass attempts"""
    print("🔍 Testing CORS Bypass Attempts...")
    
    # Test 1: Unauthorized origin
    headers = {"Origin": "https://malicious-site.com"}
    response = requests.get(f"{BACKEND_URL}/", headers=headers)
    print(f"   Unauthorized origin: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")
    
    # Test 2: No origin header (server-to-server)
    response = requests.get(f"{BACKEND_URL}/")
    print(f"   No origin header: {response.status_code} - {'✅ ALLOWED' if response.status_code == 200 else '❌ BLOCKED'}")
    
    # Test 3: Allowed origin
    headers = {"Origin": "https://devrakshit.me"}
    response = requests.get(f"{BACKEND_URL}/", headers=headers)
    print(f"   Allowed origin: {response.status_code} - {'✅ ALLOWED' if response.status_code == 200 else '❌ BLOCKED'}")

def test_rate_limiting():
    """Test rate limiting bypass attempts"""
    print("\n🔍 Testing Rate Limiting...")
    
    # Test rapid requests
    for i in range(15):
        response = requests.post(f"{BACKEND_URL}/api/contact", json={
            "name": f"Test{i}",
            "email": f"test{i}@example.com",
            "message": "Rate limit test"
        })
        if response.status_code == 429:
            print(f"   Rate limit hit after {i+1} requests - ✅ WORKING")
            break
    else:
        print("   Rate limit not enforced - ❌ VULNERABLE")

def test_input_sanitization():
    """Test input sanitization"""
    print("\n🔍 Testing Input Sanitization...")
    
    # Test XSS attempt
    malicious_input = "<script>alert('xss')</script>"
    response = requests.post(f"{BACKEND_URL}/api/contact", json={
        "name": malicious_input,
        "email": "test@example.com",
        "message": malicious_input
    })
    print(f"   XSS attempt: {response.status_code} - {'✅ BLOCKED' if response.status_code == 400 else '❌ ALLOWED'}")

def test_proxy_detection():
    """Test proxy detection"""
    print("\n🔍 Testing Proxy Detection...")
    
    # Test with proxy headers
    headers = {
        "X-Forwarded-For": "192.168.1.1",
        "X-Real-IP": "10.0.0.1",
        "Via": "proxy-server"
    }
    response = requests.get(f"{BACKEND_URL}/", headers=headers)
    print(f"   Proxy headers: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")

def test_automated_tools():
    """Test automated tool detection"""
    print("\n🔍 Testing Automated Tool Detection...")
    
    # Test with curl user agent
    headers = {"User-Agent": "curl/7.68.0"}
    response = requests.get(f"{BACKEND_URL}/", headers=headers)
    print(f"   Curl user agent: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")
    
    # Test with Python requests
    headers = {"User-Agent": "python-requests/2.25.1"}
    response = requests.get(f"{BACKEND_URL}/", headers=headers)
    print(f"   Python requests: {response.status_code} - {'✅ BLOCKED' if response.status_code == 403 else '❌ ALLOWED'}")

def test_security_headers():
    """Test security headers"""
    print("\n🔍 Testing Security Headers...")
    
    response = requests.get(f"{BACKEND_URL}/")
    headers = response.headers
    
    security_headers = {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000"
    }
    
    for header, expected_value in security_headers.items():
        if header in headers:
            print(f"   {header}: ✅ PRESENT")
        else:
            print(f"   {header}: ❌ MISSING")

def test_endpoint_security():
    """Test endpoint security"""
    print("\n🔍 Testing Endpoint Security...")
    
    # Test contact form with invalid data
    response = requests.post(f"{BACKEND_URL}/api/contact", json={
        "name": "A" * 200,  # Too long
        "email": "invalid-email",
        "message": "B" * 2000  # Too long
    })
    print(f"   Invalid data validation: {response.status_code} - {'✅ BLOCKED' if response.status_code == 400 else '❌ ALLOWED'}")

def main():
    print("🛡️ COMPREHENSIVE SECURITY TEST")
    print("=" * 50)
    
    test_cors_bypass()
    test_rate_limiting()
    test_input_sanitization()
    test_proxy_detection()
    test_automated_tools()
    test_security_headers()
    test_endpoint_security()
    
    print("\n🎯 Security Test Completed!")

if __name__ == "__main__":
    main() 