"use client"
import { useAuth } from '@/lib/contexts/AuthContext';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

function Login(props) {
    const {setUser,setAuthenticated} = useAuth()
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [logininfo, setLoginInfo] = useState({
        username: '',
        password: '',
        keyword: ''
    });

    const router = useRouter();

    useEffect(() => {
        if (errors) {
            props.showAlert(errors, "danger");
        }
    }, [errors]);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...logininfo, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors("");
        const { username, password } = logininfo;
        if (!username.trim() || !password.trim()) {
            setErrors("Username and password are required");
            return;
        }

        try {
            setIsLoading(true);

            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uname: logininfo.username,
                    upassword: logininfo.password,
                }),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            const result = await response.json();

            if (result.success) {
                Cookies.set("authToken",result.data.authToken)
                setAuthenticated(true);
                setUser(result.data.user);
                
                router.push("/vault");
            } else {
                const errorMsg = result.message || "Invalid username or password";
                setErrors(errorMsg);
            }
        } catch (error) {
            console.error("Encounter some error :", error);
            setErrors("Authentication failed. Please try again.");
        } finally {
            setLoginInfo({
                username: "",
                password: ""
            });
            setIsLoading(false);
        }
    }

    return (
        <>
            {/* Background with blur effect */}
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden ">
                
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    
                    {/* Gradient orbs */}
                    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-l from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl"></div>
                    
                    {/* Security pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/api/placeholder/800/800')] opacity-[0.02]"></div>
                </div>

                {/* Main content with glass effect */}
                <div className="relative z-10 w-full max-w-md px-2 py-2">
                    {/* Glass container */}
                    <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-2xl">
                        
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-transparent to-blue-500/30 rounded-3xl blur opacity-30"></div>
                        
                        {/* Inner content */}
                        <div className="relative">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    Secure Access
                                </h2>
                                <p className="mt-3 text-gray-400 text-sm">
                                    Enter your credentials to access your vault
                                </p>
                            </div>

                            {/* Error message */}
                            {errors && (
                                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 backdrop-blur-sm">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-300 text-sm">{errors}</span>
                                    </div>
                                </div>
                            )}

                            {/* Login form */}
                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Username field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            onChange={handlechange}
                                            value={logininfo.username}
                                            disabled={isLoading}
                                            className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handlechange}
                                            value={logininfo.password}
                                            disabled={isLoading}
                                            className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Security note */}
                                <div className="p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50">
                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-xs text-gray-400">
                                            Your credentials are encrypted end-to-end using AES-256 encryption
                                        </p>
                                    </div>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`group relative w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)'
                                    }}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Authenticating...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <span>Secure Login</span>
                                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    )}
                                </button>

                                {/* Register link */}
                                <div className="text-center pt-4 border-t border-white/10">
                                    <p className="text-gray-400 text-sm">
                                        Don't have an account?{' '}
                                        <Link 
                                            href="/register" 
                                            className="font-medium bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent hover:from-amber-400 hover:to-orange-500 transition-all"
                                        >
                                            Create secure account
                                        </Link>
                                    </p>
                                </div>
                            </form>

                            {/* Security badge
                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-gray-400">End-to-End Encrypted</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;