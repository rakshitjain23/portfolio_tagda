'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Testing backend connection...');
      
      // Test 1: Simple GET request
      const response1 = await fetch('https://portfolio-tagda.onrender.com/test-cors');
      console.log('Test 1 response:', response1.status);
      
      if (response1.ok) {
        const data1 = await response1.json();
        console.log('Test 1 data:', data1);
        setResult(prev => prev + '✅ CORS Test: SUCCESS\n');
      } else {
        setResult(prev => prev + '❌ CORS Test: FAILED\n');
      }
      
      // Test 2: Chat API
      const response2 = await fetch('https://portfolio-tagda.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello' }),
      });
      console.log('Test 2 response:', response2.status);
      
      if (response2.ok) {
        const data2 = await response2.json();
        console.log('Test 2 data:', data2);
        setResult(prev => prev + '✅ Chat API: SUCCESS\n');
      } else {
        const errorText = await response2.text();
        console.error('Test 2 error:', errorText);
        setResult(prev => prev + '❌ Chat API: FAILED\n');
      }
      
    } catch (error) {
      console.error('Test error:', error);
      setResult(prev => prev + `❌ Error: ${error}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Backend Connection Test</h1>
      
      <button 
        onClick={testBackend}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Results:</h2>
        <pre className="whitespace-pre-wrap">{result || 'Click the button to test'}</pre>
      </div>
      
      <div className="mt-4">
        <h2 className="font-bold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Click "Test Backend Connection"</li>
          <li>Check the results above</li>
          <li>Open browser console (F12) to see detailed logs</li>
          <li>Share any error messages you see</li>
        </ol>
      </div>
    </div>
  );
} 