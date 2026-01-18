"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Eye, EyeOff, Zap, Lock, CheckCircle, AlertCircle, BarChart3, Activity } from 'lucide-react';

function StrengthCheck() {
    const [realTimeCheck ,setRealTimeCheck] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState({
        score: 0,
        rating: "",
        feedback: []
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    const debouncedStrengthCheck = useCallback(async (pass) => {
        if (!pass) return;
        
        setIsLoading(true);
        setError("");
        
        try {
            const url = `${import.meta.env.VITE_APP_HOST}/gs/api/v1/core/pass-strength`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: pass })
            });

            const data = await response.json();
            if (data.success) {
                setStrength({
                    score: data.data.score,
                    rating: data.data.rating,
                    feedback: data.data.feedback || []
                })
            } else {
                setError("Failed to analyze password");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (realTimeCheck && password) {
            const timer = setTimeout(() => {
                debouncedStrengthCheck(password);
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [password, realTimeCheck, debouncedStrengthCheck]);

    const handleStrengthCheck = async () => {
        if (!password) {
            setError("Please enter a password");
            return;
        }
        
        debouncedStrengthCheck(password);
    }

    const getStrengthColor = (score) => {
        if (score >= 80) return { gradient: 'from-emerald-500 to-green-500', text: 'text-emerald-300' };
        if (score >= 60) return { gradient: 'from-cyan-500 to-blue-500', text: 'text-cyan-300' };
        if (score >= 40) return { gradient: 'from-amber-500 to-orange-500', text: 'text-amber-300' };
        return { gradient: 'from-rose-500 to-red-500', text: 'text-rose-300' };
    };

    return (
        <div className="min-h-screen">
            {/* Background Blur Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
                {/* Main Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Section - Header & Info */}
                    <div className="flex flex-col justify-center">
                        <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-10">
                            {/* Glow Effect */}
                            {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-3xl blur opacity-30"></div> */}
                            
                            <div className="relative">
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
                                        <div className="relative p-5 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl shadow-lg">
                                            <Shield className="w-12 h-12 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center">
                                            <BarChart3 className="w-4 h-4 text-black" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Title */}
                                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                                    <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                                        Password Strength{' '}
                                    </span>
                                    <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                                        Analyzer
                                    </span>
                                </h2>
                                
                                {/* Description */}
                                <p className="text-gray-300 text-center mb-8 leading-relaxed">
                                    Test your password against enterprise security standards with real-time analysis
                                </p>
                                
                                {/* Features */}
                                <div className="space-y-4">
                                    {[
                                        { icon: <Zap className="w-5 h-5" />, text: 'Real-time strength calculation', color: 'from-amber-500 to-orange-500' },
                                        { icon: <Lock className="w-5 h-5" />, text: 'Entropy and pattern analysis', color: 'from-blue-500 to-cyan-500' },
                                        { icon: <Activity className="w-5 h-5" />, text: 'Brute-force resistance testing', color: 'from-emerald-500 to-green-500' },
                                        { icon: <Shield className="w-5 h-5" />, text: 'Industry standard compliance', color: 'from-purple-500 to-violet-500' },
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} mr-3`}>
                                                {feature.icon}
                                            </div>
                                            <span className="text-gray-200 text-sm">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Analysis Form */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur opacity-30"></div>
                        
                        <div className="relative p-8 sm:p-10">
                            {/* Input Section */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Enter Password to Analyze
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:outline-none transition-all duration-300 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                
                                {/* Real-time Check Toggle */}
                                <div className="flex items-center mt-4 p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="real-time-check"
                                            type="checkbox"
                                            checked={realTimeCheck}
                                            onChange={() => setRealTimeCheck(!realTimeCheck)}
                                            className="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500/50"
                                        />
                                    </div>
                                    <label htmlFor="real-time-check" className="ml-3 text-sm text-gray-300 flex items-center">
                                        <Zap className="w-4 h-4 text-amber-400 mr-2" />
                                        Enable real-time analysis
                                    </label>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-8 p-5 rounded-xl backdrop-blur-sm bg-gradient-to-r from-rose-900/30 to-red-900/20 border-l-4 border-rose-500">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5" />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-rose-200">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Strength Indicator */}
                            {(strength.score > 0 || isLoading) && (
                                <div className="mb-8 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <Activity className="w-5 h-5 text-cyan-400 mr-2" />
                                                <span className="text-sm font-medium text-gray-300">Password Strength</span>
                                            </div>
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStrengthColor(strength.score).text} bg-black/30`}>
                                                {strength.rating}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getStrengthColor(strength.score).gradient}`}
                                                        style={{ width: `${strength.score}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                                    <span>Weak</span>
                                                    <span>Fair</span>
                                                    <span>Good</span>
                                                    <span>Strong</span>
                                                    <span>Excellent</span>
                                                </div>
                                            </div>
                                            
                                            {/* Score */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-400">Security Score</span>
                                                <span className={`text-sm font-bold ${getStrengthColor(strength.score).text}`}>
                                                    {strength.score}/100
                                                </span>
                                            </div>
                                        </div>

                                        {/* Feedback */}
                                        {strength.feedback && strength.feedback.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                <p className="text-sm font-medium text-gray-300">Analysis Results:</p>
                                                <div className="space-y-2">
                                                    {strength.feedback.map((item, index) => (
                                                        <div key={index} className="flex items-start text-sm">
                                                            {strength.score >= 60 ? (
                                                                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                                                            ) : (
                                                                <AlertCircle className="h-4 w-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                                                            )}
                                                            <span className="text-gray-200">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Analyze Button */}
                            <button
                                onClick={handleStrengthCheck}
                                disabled={!password || isLoading}
                                className={`group relative w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden ${
                                    !password ? 'opacity-50 cursor-not-allowed' : ''
                                } bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500`}
                            >
                                {/* Button Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                
                                {/* Button Content */}
                                <div className="relative flex items-center justify-center">
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                            <span>Analyzing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Activity className="w-5 h-5 mr-2" />
                                            <span>Analyze Password Security</span>
                                        </>
                                    )}
                                </div>
                            </button>

                            {/* Security Guidelines */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="text-sm font-medium text-gray-300 mb-4">Password Security Guidelines</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { text: 'Minimum 12 characters', icon: '🔢' },
                                        { text: 'Mix of uppercase & lowercase', icon: '↕️' },
                                        { text: 'Include numbers and symbols', icon: '#️⃣' },
                                        { text: 'Avoid common patterns & words', icon: '🚫' },
                                    ].map((guideline, index) => (
                                        <div key={index} className="flex items-center p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                                            <span className="text-lg mr-3">{guideline.icon}</span>
                                            <span className="text-xs text-gray-200">{guideline.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StrengthCheck;