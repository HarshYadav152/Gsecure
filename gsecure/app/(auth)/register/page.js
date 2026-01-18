"use client"
import React, { useState } from 'react'
import CryptoJS from "crypto-js";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Signup() {
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [signupinfo, setsignupInfo] = useState({
        uname: '',
        uemail: '',
        upassword: '',
        keyword: ''
    })

    const router = useRouter();

    const handlechange = (e) => {
        const { name, value } = e.target;
        setsignupInfo({ ...signupinfo, [name]: value })
    }

    const handlesignup = async (e) => {
        e.preventDefault();
        setErrors("");
        setIsLoading(true);
        const { uname, uemail, upassword, keyword } = signupinfo

        if (!uname || !uemail || !upassword || !keyword) {
            setErrors("Please fill all required fields");
            setIsLoading(false);
            return;
        }

        try {
            const encryptedUsername = CryptoJS.AES.encrypt(uname, keyword).toString();
            const encryptedPassword = CryptoJS.AES.encrypt(upassword, keyword).toString();
            const encryptedEmail = CryptoJS.AES.encrypt(uemail, keyword).toString();

            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/register`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uname: encryptedUsername,
                    uemail: encryptedEmail,
                    upassword: encryptedPassword,
                    keyword: keyword
                }),
                credentials:"include"
            });

            const result = await response.json();

            if (result.ok || result.success) {
                toast.success("Account created successfully");
                router.push("/vault");
            } else {
                const errorMsg = result.message || "Registration failed";
                setErrors(errorMsg);
                toast.error(errorMsg);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrors("Network error. Please try again.");
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsLoading(false)
            setsignupInfo({
                uname: "",
                upassword: "",
                uemail: "",
                keyword: ""
            })
        }
    }

    return (
        <>
            {/* Background with blur effect */}
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    
                    {/* Gradient orbs */}
                    <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-r from-green-500/5 to-emerald-600/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gradient-to-l from-amber-500/5 to-orange-600/5 rounded-full blur-3xl"></div>
                    
                    {/* Security pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px]"></div>
                    </div>
                </div>

                {/* Main content with glass effect */}
                <div className="relative z-10 w-full max-w-2xl px-2 py-2">
                    {/* Glass container */}
                    <div className="relative rounded-3xl p-4 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-2xl">
                        
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-transparent to-amber-500/20 rounded-3xl blur opacity-30"></div>
                        
                        {/* Inner content */}
                        <div className="relative">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                            </svg>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                                    Join G-Secure
                                </h2>
                                <p className="mt-3 text-gray-400">
                                    Create your secure vault in seconds
                                </p>
                            </div>

                            {/* Error message */}
                            {errors && (
                                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 backdrop-blur-sm">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-300">{errors}</span>
                                    </div>
                                </div>
                            )}

                            {/* Signup form */}
                            <form onSubmit={handlesignup} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Username field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Username *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="uname"
                                                name="uname"
                                                type="text"
                                                value={signupinfo.uname}
                                                onChange={handlechange}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 disabled:opacity-50"
                                                placeholder="Choose a username"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="uemail"
                                                name="uemail"
                                                type="email"
                                                value={signupinfo.uemail}
                                                onChange={handlechange}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 disabled:opacity-50"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="upassword"
                                                name="upassword"
                                                type="password"
                                                value={signupinfo.upassword}
                                                onChange={handlechange}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 disabled:opacity-50"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Minimum 8 characters with letters and numbers
                                        </p>
                                    </div>

                                    {/* Keyword field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Encryption Key *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                            </div>
                                            <input
                                                id="keyword"
                                                name="keyword"
                                                type="text"
                                                value={signupinfo.keyword}
                                                onChange={handlechange}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 disabled:opacity-50"
                                                placeholder="Your encryption key"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            This key will be used to encrypt your data
                                        </p>
                                    </div>
                                </div>

                                {/* Security features */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50">
                                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                                        <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Your data is protected with:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-xs text-gray-400">AES-256 Encryption</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-xs text-gray-400">End-to-End Security</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-xs text-gray-400">Zero-Knowledge</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span className="text-xs text-gray-400">Military Grade</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms agreement */}
                                <div className="flex items-start p-4 rounded-xl bg-gradient-to-r from-gray-900/40 to-gray-800/40 border border-gray-700/40">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 mt-1 text-green-500 focus:ring-green-500 border-gray-500 rounded bg-white/10"
                                        required
                                    />
                                    <label htmlFor="terms" className="ml-3 block text-sm text-gray-400">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-green-400 hover:text-green-300 transition-colors">
                                            Terms of Service
                                        </Link>
                                        {' '}and{' '}
                                        <Link href="/privacy" className="text-green-400 hover:text-green-300 transition-colors">
                                            Privacy Policy
                                        </Link>
                                        . I understand that my encryption key cannot be recovered if lost.
                                    </label>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`group relative w-full py-4 px-4 rounded-xl font-medium text-white transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-900/30'}`}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)'
                                    }}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating Secure Account...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <span>Create Secure Account</span>
                                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    )}
                                </button>

                                {/* Login link */}
                                <div className="text-center pt-6 border-t border-white/10">
                                    <p className="text-gray-400">
                                        Already have an account?{' '}
                                        <Link 
                                            href="/login" 
                                            className="font-medium bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent hover:from-amber-400 hover:to-orange-500 transition-all"
                                        >
                                            Sign in to your vault
                                        </Link>
                                    </p>
                                </div>
                            </form>

                            {/* Security badge */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                                        <span className="text-xs text-gray-400">256-bit Encryption</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse mr-2"></div>
                                        <span className="text-xs text-gray-400">Secure Cloud</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse mr-2"></div>
                                        <span className="text-xs text-gray-400">Zero-Knowledge</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup