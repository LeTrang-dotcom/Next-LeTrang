"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginClient({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleLogin() {
    event.preventDefault();
    onLogin({email, password})
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-500">
          Don&apos;t have an account?
          <Link href={"/signup"} className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
