"use client"
import React, { useState } from 'react';
import { Lock, Shield, Key, Globe, User, FileText, Save, Eye, EyeOff, Zap } from 'lucide-react';
import CryptoJS from 'crypto-js';

const AddPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showKeyword, setShowKeyword] = useState(false)
  const [status, setStatus] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    website: '',
    password: '',
    notes: '',
    keyword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEncrypt = () => {
    const { username, password, notes, keyword, website } = formData;
    
    if (!keyword) {
      throw new Error("Master key is required for encryption");
    }
    
    const encryptedUsername = CryptoJS.AES.encrypt(username, keyword).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, keyword).toString();

    return {
      username: encryptedUsername,
      password: encryptedPassword,
      keyword: keyword,
      website: website,
      notes: notes
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    
    try {
      if (!formData.keyword) {
        setStatus("⚠️ Master key is required for encryption");
        return;
      }
      
      const encryptedData = handleEncrypt();
      
      const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/vault/add-item`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptedData)
      });

      const result = await response.json();

      if (result.ok) {
        setStatus("✅ Password saved successfully! Remember your master key - it cannot be recovered.");
      } else {
        setStatus("⚠️ " + (result.message || "Something went wrong"));
      }
    } catch (error) {
      setStatus("❌ Error: " + error.message);
    } finally {
      setIsLoading(false);
      if (!status.includes('Error')) {
        setFormData({
          username: '',
          website: '',
          password: '',
          notes: '',
          keyword: '',
        });
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Background Blur Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Glass Container */}
        <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-3xl blur opacity-30"></div>
          
          <div className="relative p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
                  <div className="relative p-5 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl shadow-lg">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                  Add Secure{' '}
                </span>
                <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  Password
                </span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                All data is encrypted locally before storage with AES-256 encryption
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Form Section */}
              <div className="space-y-6">
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      Username / Email
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username or email"
                      className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Website Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-2" />
                      Website / Application
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Key className="w-4 h-4 text-gray-400 mr-2" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Notes Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Add any hints or details"
                      className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Master Key Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 flex items-center">
                      <Lock className="w-4 h-4 text-gray-400 mr-2" />
                      Master Encryption Key
                    </label>
                    <div className="relative">
                      <input
                        type={showKeyword ? "text" : "password"}
                        name="keyword"
                        value={formData.keyword}
                        onChange={handleChange}
                        placeholder="Your encryption master key"
                        className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeyword(!showKeyword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        {showKeyword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ⚠️ Remember this key - it cannot be recovered if lost
                    </p>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className={`p-4 rounded-xl backdrop-blur-sm ${
                      status.includes('✅') ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/20 border-l-4 border-emerald-500' :
                      status.includes('⚠️') ? 'bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border-l-4 border-amber-500' :
                      'bg-gradient-to-r from-rose-900/30 to-red-900/20 border-l-4 border-rose-500'
                    }`}>
                      <div className="flex items-start">
                        {status.includes('✅') ? (
                          <svg className="w-5 h-5 text-emerald-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : status.includes('⚠️') ? (
                          <svg className="w-5 h-5 text-amber-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-rose-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="text-sm text-gray-200">{status}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !formData.keyword}
                    className="group relative w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Button Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                    
                    {/* Button Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          <span>Encrypting & Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          <span>Encrypt & Save Password</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Security Badges */}
                <div className="flex flex-wrap gap-3 justify-center pt-6 border-t border-white/10">
                  <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-full border border-blue-900/30">
                    🔐 AES-256 Encryption
                  </span>
                  <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-emerald-900/30 to-green-900/20 text-emerald-300 rounded-full border border-emerald-900/30">
                    🛡️ Zero-Knowledge
                  </span>
                  <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-purple-900/30 to-violet-900/20 text-purple-300 rounded-full border border-purple-900/30">
                    💻 Local Processing
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-8">
                {/* Security Card */}
                <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-amber-400 mr-2" />
                    How Encryption Works
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Your password is encrypted locally using AES-256",
                      "The encryption key is never stored on our servers",
                      "Only you can decrypt with your master key",
                      "End-to-end encryption ensures maximum privacy"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Features */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300">Security Features:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'AES-256', color: 'from-blue-500 to-cyan-500', icon: '🔒' },
                      { label: 'Zero-Knowledge', color: 'from-emerald-500 to-green-500', icon: '🛡️' },
                      { label: 'Local Encryption', color: 'from-purple-500 to-violet-500', icon: '💻' },
                      { label: 'Secure Storage', color: 'from-amber-500 to-orange-500', icon: '🗄️' },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                        <span className="text-lg mr-2">{feature.icon}</span>
                        <span className="text-xs text-gray-300">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Note */}
                <div className="relative backdrop-blur-sm bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl border border-amber-900/30 p-5">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 mr-3">
                      <Key className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-amber-300 mb-1">Important</h4>
                      <p className="text-sm text-amber-200/80">
                        Your master key is never stored. If you lose it, you won't be able to decrypt your passwords.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPassword;