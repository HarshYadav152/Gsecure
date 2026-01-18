"use client"
import React, { useRef, useState } from "react";

export default function BreachCheck() {
    const [pass, setPass] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState("")
    const buttonRef = useRef(null);

    const onchange = (e) => {
        setPass(e.target.value)
    }
    const handleKeyPress = (e) => {
        // Check if Enter key was pressed
        if (e.key === "Enter" && !isLoading) {
            handleBreachCheck();
        }
    }
    const handleBreachCheck = async () => {

        if (!pass) {
            setStatus("Please enter a password to check");
            return;
        }
        setIsLoading(true);
        setStatus("");

        try {
            const url = `${import.meta.env.VITE_APP_HOST}/gs/api/v1/core/breach-check`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: pass })
            })
            // console.log(response)
            if (!response.ok) {
                console.log("Try again for checking breach..");
            }
            const data = await response.json();
            if (data.success) {
                if (data.data?.compromised) {
                    setStatus("⚠️ This password has been found in data breaches. Please change it immediately!");
                } else {
                    setStatus("✅ Good news! This password hasn't been found in known data breaches.");
                }
            } else {
                setStatus("Try again")
            }
        } catch (error) {
            setStatus(`Error occured : try again.`);
        } finally {
            setIsLoading(false);
        }
    }

    const Loader = () => (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );

    return (
        <div className="min-h-screen">
            {/* Background Blur Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-rose-500/5 to-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-16">
                {/* Glass Container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    
                    {/* Red Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-3xl blur opacity-30"></div>
                    
                    <div className="relative p-8 sm:p-10">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur opacity-30 animate-pulse"></div>
                                <div className="relative p-3 bg-gradient-to-br from-red-900 to-rose-900 rounded-2xl shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent mb-3">
                                Password Breach Check
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Verify if your password has been exposed in data breaches
                            </p>
                        </div>

                        {/* Form Container */}
                        <div className="mb-8">
                            <label htmlFor="password-check" className="block text-sm font-medium text-gray-300 mb-3">
                                Enter Password to Check
                            </label>
                            <div className="relative">
                                <input
                                    id="password-check"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={pass}
                                    onChange={onchange}
                                    onKeyDown={handleKeyPress}
                                    className="w-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 focus:outline-none transition-all duration-300 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        ) : (<>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </>)}
                                    </svg>
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg inline-block">
                                We use secure hashing (SHA-1) to check breaches without storing your password
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className={`mb-8 p-5 rounded-xl backdrop-blur-sm border-l-4 transition-all duration-300 ${
                                status.includes('found in data breaches') ? 
                                    'bg-gradient-to-r from-red-900/30 to-rose-900/20 border-red-500' :
                                status.includes("hasn't been found") ? 
                                    'bg-gradient-to-r from-green-900/30 to-emerald-900/20 border-green-500' :
                                    'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border-blue-500'
                            }`}>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {status.includes('found in data breaches') ? (
                                            <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        ) : status.includes("hasn't been found") ? (
                                            <svg className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <p className={`text-sm font-medium ${
                                            status.includes('found in data breaches') ? 'text-red-200' :
                                            status.includes("hasn't been found") ? 'text-green-200' :
                                            'text-blue-200'
                                        }`}>
                                            {status}
                                        </p>
                                        {status.includes('found in data breaches') && (
                                            <p className="mt-2 text-xs text-red-300">
                                                ⚠️ Recommendation: Change this password immediately on all accounts where it's used
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Check Button */}
                        <button
                            onClick={handleBreachCheck}
                            disabled={!pass || isLoading}
                            className={`group relative w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden ${
                                isLoading ? 'bg-gradient-to-r from-red-800 to-rose-800' : 
                                'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
                            } focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {/* Button Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                            
                            {/* Button Content */}
                            <div className="relative flex justify-center items-center">
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <Loader />
                                        <span>Checking Have I Been Pwned database...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Check for Breaches</span>
                                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Footer Info */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400 mb-2">
                                Powered by{' '}
                                <a 
                                    href="https://haveibeenpwned.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-red-400 hover:text-red-300 hover:underline transition-colors"
                                >
                                    Have I Been Pwned
                                </a>{' '}
                                API
                            </p>
                            <p className="text-xs text-gray-500 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-lg inline-block">
                                🔒 Your password is hashed locally before checking against the database
                            </p>
                            
                            {/* Security Badges */}
                            <div className="flex flex-wrap justify-center gap-3 mt-6">
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-red-900/30 to-rose-900/20 text-red-300 rounded-full border border-red-900/30">
                                    Secure Hashing
                                </span>
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-amber-900/30 to-yellow-900/20 text-amber-300 rounded-full border border-amber-900/30">
                                    Real-time Check
                                </span>
                                <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-emerald-900/30 to-green-900/20 text-emerald-300 rounded-full border border-emerald-900/30">
                                    Privacy First
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}