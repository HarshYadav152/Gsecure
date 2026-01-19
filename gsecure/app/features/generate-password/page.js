"use client"
import React, { useState } from "react";
import { Key, Copy, RefreshCw, Shield, Zap, Lock, CheckCircle } from 'lucide-react';

export default function GeneratePassword() {
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passStrength, setPassStrength] = useState({
        score: "",
        rating: "",
        feedback: ""
    })

    const [error, setError] = useState("")
    const [requirement, setRequirement] = useState({
        plength: 15,
        keyword: ""
    });

    const [copied, setCopied] = useState(false);

    const onchange = (e) => {
        setRequirement({ ...requirement, [e.target.name]: e.target.value })
    }
    const generateNewPassword = async () => {
        try {
            setIsLoading(true)
            setError("")
            setCopied(false);
            if (parseInt(requirement.plength) < 10) {
                setError("Minimum length should be 10");
                return;
            }

            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/core/generate-pass`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ plength: parseInt(requirement.plength), keyword: requirement.keyword })
            })
            const result = await response.json();
            if (result.success) {
                if (result.data && result.data.gresponse && result.data.gresponse.password) {
                    setPassword(result.data.gresponse.password);
                    const { score, rating, feedback } = result.data.strength;
                    setPassStrength({
                        score: score,
                        rating: rating,
                        feedback: feedback
                    })
                } else if (typeof result.data.gresponse === 'string') {
                    setPassword(result.data.gresponse);
                    const { score, rating, feedback } = result.data.strength;
                    setPassStrength({
                        score: score,
                        rating: rating,
                        feedback: feedback
                    })
                } else {
                    setError("Unexpected response format from API");
                    console.error("Unexpected response format:", result);
                }
            } else {
                setError(result.message || "Failed to generate password");
            }
        } catch (error) {
            console.error("Error generating password:", error);
            setError("An error occurred while generating the password");
        } finally {
            setIsLoading(false)
            setRequirement({
                plength: 15,
                keyword: ""
            })
        }
    };

    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Background Blur Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-16">
                {/* Glass Container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    
                    {/* Amber Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur opacity-30"></div>
                    
                    <div className="relative p-8 sm:p-10">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full blur opacity-30 animate-pulse"></div>
                                <div className="relative p-3 bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl shadow-lg">
                                    <Key className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-black" />
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent mb-3">
                                Secure Password Generator
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Create strong, random passwords with military-grade security
                            </p>
                        </div>

                        {/* Password Display Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Your Secure Password
                            </label>
                            <div className="relative">
                                <input
                                    id="generated-password"
                                    type="text"
                                    readOnly
                                    value={password || ''}
                                    className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-4 font-mono text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none transition-all duration-300 pr-24"
                                    placeholder="Your password will appear here"
                                />
                                <button
                                    onClick={handleCopy}
                                    disabled={!password}
                                    className={`absolute inset-y-0 right-0 px-5 border-l border-white/10 rounded-r-xl flex items-center justify-center transition-all duration-300 ${!password ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5'}`}
                                >
                                    {copied ? (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="text-green-400 text-sm">Copied!</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Copy className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-400 text-sm">Copy</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg inline-block">
                                🔒 Generated with cryptographic algorithms
                            </p>
                        </div>

                        {/* Configuration Options */}
                        <div className="space-y-6 mb-8 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                            <div>
                                <label htmlFor="password-length" className="block text-sm font-medium text-gray-300 mb-4">
                                    Password Length: <span className="font-bold text-amber-300">{requirement.plength} characters</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password-length"
                                        type="range"
                                        min="12"
                                        max="64"
                                        name="plength"
                                        value={requirement.plength}
                                        onChange={onchange}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-amber-500 [&::-webkit-slider-thumb]:to-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                                        <span>12</span>
                                        <span>38</span>
                                        <span>64</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="keyword" className="block text-sm font-medium text-gray-300 mb-3">
                                    Include Keyword (Optional)
                                </label>
                                <div className="relative">
                                    <input
                                        id="keyword"
                                        type="text"
                                        name="keyword"
                                        value={requirement.keyword}
                                        onChange={onchange}
                                        className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none transition-all duration-300"
                                        placeholder="Add a memorable word"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Add a custom word to make the password more memorable
                                </p>
                            </div>

                            {/* Security Features */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Uppercase (A-Z)', enabled: true, color: 'from-green-500 to-emerald-500' },
                                    { label: 'Lowercase (a-z)', enabled: true, color: 'from-blue-500 to-cyan-500' },
                                    { label: 'Numbers (0-9)', enabled: true, color: 'from-purple-500 to-violet-500' },
                                    { label: 'Symbols (!@#$)', enabled: true, color: 'from-amber-500 to-orange-500' },
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                                        <div className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${feature.color}`}></div>
                                        <span className="text-sm text-gray-300">{feature.label}</span>
                                        <div className="ml-auto">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-8 p-5 rounded-xl backdrop-blur-sm bg-gradient-to-r from-red-900/30 to-rose-900/20 border-l-4 border-red-500">
                                <div className="flex items-start">
                                    <svg className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-red-200">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Strength Indicator */}
                        {password && (
                            <div className="mb-8 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                                <div className="space-y-4">
                                    {/* Strength Label */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Shield className="w-5 h-5 text-amber-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-300">Password Strength</span>
                                        </div>
                                        <span className={`text-sm font-semibold ${passStrength.score >= 80 ? 'text-green-400' :
                                            passStrength.score >= 60 ? 'text-emerald-400' :
                                                passStrength.score >= 40 ? 'text-amber-400' :
                                                    'text-red-400'
                                            }`}>
                                            {passStrength.rating}
                                        </span>
                                    </div>

                                    {/* Strength Bar */}
                                    <div className="relative">
                                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    passStrength.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                    passStrength.score >= 60 ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' :
                                                    passStrength.score >= 40 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                                                        'bg-gradient-to-r from-red-500 to-rose-500'
                                                }`}
                                                style={{ width: `${passStrength.score}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                                            <span>Weak</span>
                                            <span>Good</span>
                                            <span>Strong</span>
                                            <span>Excellent</span>
                                        </div>
                                    </div>

                                    {/* Feedback Messages */}
                                    {passStrength.feedback && passStrength.feedback.length > 0 && (
                                        <div className={`mt-4 space-y-2 ${passStrength.score >= 80 ? 'text-green-300' :
                                                passStrength.score >= 60 ? 'text-emerald-300' :
                                                    passStrength.score >= 40 ? 'text-amber-300' :
                                                        'text-red-300'
                                            }`}>
                                            <p className="text-sm font-medium">Security Analysis:</p>
                                            <div className="space-y-2">
                                                {passStrength.feedback.map((message, index) => (
                                                    <div key={index} className="flex items-start text-xs">
                                                        <svg
                                                            className={`flex-shrink-0 h-4 w-4 mt-0.5 mr-2 ${
                                                                passStrength.score >= 60 ? 'text-green-400' : 'text-amber-400'
                                                            }`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            {passStrength.score >= 60 ? (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            ) : (
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                            )}
                                                        </svg>
                                                        <span>{message}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button
                                onClick={generateNewPassword}
                                disabled={isLoading}
                                className="group relative w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {/* Button Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                
                                {/* Button Content */}
                                <div className="relative flex items-center justify-center">
                                    {isLoading ? (
                                        <div className="flex items-center gap-3">
                                            <span>Generating Secure Password...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-5 h-5 mr-2" />
                                            <span>Generate Secure Password</span>
                                        </>
                                    )}
                                </div>
                            </button>

                            {password && (
                                <button
                                    onClick={handleCopy}
                                    className="group relative w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20"
                                >
                                    <div className="relative flex items-center justify-center">
                                        <Copy className="w-5 h-5 mr-2" />
                                        <span>Copy to Clipboard</span>
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Security Info */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex flex-wrap justify-center gap-3">
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-amber-900/30 to-orange-900/20 text-amber-300 rounded-full border border-amber-900/30">
                                    <Lock className="inline w-3 h-3 mr-1" /> AES-256
                                </span>
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-emerald-900/30 to-green-900/20 text-emerald-300 rounded-full border border-emerald-900/30">
                                    <Shield className="inline w-3 h-3 mr-1" /> Cryptographically Secure
                                </span>
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-full border border-blue-900/30">
                                    <Zap className="inline w-3 h-3 mr-1" /> Real-time Generation
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}