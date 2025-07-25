"use client";

import { useState } from "react";

export default function TestDbPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/test-db");
      const data = await response.json();
      setResult({ success: response.ok, data });
    } catch (error) {
      setResult({ success: false, data: { message: error.message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <div className="max-w-md w-full text-center bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        <p className="text-slate-300 mb-6">
          Click the button below to perform a direct, isolated connection test to your MongoDB cluster.
        </p>
        <button
          onClick={handleTest}
          disabled={loading}
          className="btn btn-primary w-full disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {loading ? "Testing..." : "Test Database Connection"}
        </button>

        {result && (
          <div className="mt-6 p-4 rounded-md text-left text-sm animate-fade-in" style={{ backgroundColor: result.success ? '#16a34a' : '#dc2626' }}>
            <h3 className="font-bold mb-2">Test Result:</h3>
            <pre className="whitespace-pre-wrap break-all">{JSON.stringify(result.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
