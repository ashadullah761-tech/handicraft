"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Logged in successfully!" });
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Check your email for the confirmation link." });
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="bg-gray-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#2d3748] p-8 text-center">
          <h1 className="text-3xl font-bold font-serif text-[#f2cc8f] mb-2">HeritageLoom</h1>
          <p className="text-gray-300 text-sm">Sign in to manage your orders and wishlist.</p>
        </div>
        
        <div className="p-8">
          {message.text && (
            <div className={`p-4 rounded-md mb-6 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                {isLogin && <a href="#" className="text-xs text-[#e07a5f] hover:underline">Forgot password?</a>}
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#e07a5f] hover:bg-[#d06b50] text-white py-3.5 rounded-xl font-bold transition-colors disabled:opacity-70 mt-4 shadow-md"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#e07a5f] hover:underline focus:outline-none"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
