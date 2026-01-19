"use client"
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import React from 'react';
import { Shield, Lock, Globe, Key, Zap, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();
    
    const features = [
        { icon: <Lock className="w-5 h-5" />, text: "Store all your passwords in one encrypted vault", color: "from-blue-500 to-cyan-500" },
        { icon: <Globe className="w-5 h-5" />, text: "Access them anytime, anywhere", color: "from-emerald-500 to-green-500" },
        { icon: <Key className="w-5 h-5" />, text: "Generate strong, unique passwords in seconds", color: "from-amber-500 to-orange-500" },
        { icon: <Shield className="w-5 h-5" />, text: "Ensuring Zero Knowledge protocol", color: "from-violet-500 to-purple-500" },
        { icon: <Zap className="w-5 h-5" />, text: "Check passwords against known breaches", color: "from-rose-500 to-pink-500" },
        { icon: <Sparkles className="w-5 h-5" />, text: "Automatic form filling & secure sharing", color: "from-indigo-500 to-blue-500" },
    ];

    return (
        <>
            <div className="min-h-screen relative overflow-hidden">
                
                {/* Background Effects */}
                <div className="absolute inset-0">
                    {/* Animated Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    
                    {/* Floating Gradient Orbs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
                    
                    {/* Security Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:50px_50px]"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                    {/* Glass Container */}
                    <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl max-w-5xl mx-auto">
                        
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-amber-500/20 rounded-3xl blur opacity-30"></div>
                        
                        <div className="relative">
                            {/* Header */}
                            <div className="text-center mb-12">
                                {/* Animated Shield */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
                                        <div className="relative p-6 bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 rounded-2xl shadow-2xl">
                                            <Shield className="w-16 h-16 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                            <Sparkles className="w-6 h-6 text-black" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                                        Welcome to{' '}
                                    </span>
                                    <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                                        G-Secure
                                    </span>
                                </h1>
                                
                                {/* Subtitle */}
                                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                                    Your Modern Password Management Solution
                                </p>
                                
                                {/* Animated Underline */}
                                <div className="flex justify-center mb-12">
                                    <div className="h-1 w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            {/* Main Description */}
                            <div className="mb-12">
                                <p className="text-gray-300 text-lg md:text-xl text-center leading-relaxed max-w-3xl mx-auto mb-8">
                                    Say goodbye to password anxiety!{' '}
                                    <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        G-Secure
                                    </span>{' '}
                                    is a sleek, secure, and user-friendly password manager designed to keep your credentials safe and always within reach.
                                </p>
                                
                                {/* Quote */}
                                <div className="relative backdrop-blur-lg bg-gradient-to-r from-amber-900/20 to-yellow-900/20 rounded-2xl p-6 md:p-8 border border-amber-500/30 max-w-2xl mx-auto">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                                        <span className="text-black font-bold text-sm">"</span>
                                    </div>
                                    <blockquote className="text-gray-200 italic text-lg md:text-xl text-center leading-relaxed">
                                        Get started today and experience a safer, smarter way to manage your digital life. Stay safe.
                                    </blockquote>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold text-white text-center mb-8">
                                    <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                                        Why Choose G-Secure?
                                    </span>
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {features.map((feature, index) => (
                                        <div 
                                            key={index}
                                            className="group relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Feature Icon */}
                                            <div className={`mb-3 p-3 rounded-lg bg-gradient-to-r ${feature.color} w-fit`}>
                                                <div className="text-white">
                                                    {feature.icon}
                                                </div>
                                            </div>
                                            
                                            {/* Feature Text */}
                                            <p className="text-gray-200 text-sm">
                                                {feature.text}
                                            </p>
                                            
                                            {/* Check Indicator */}
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-6 max-w-2xl mx-auto">
                                {/* Main CTA Row */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {!user ? (
                                        <Link 
                                            href="/register" 
                                            className="group relative overflow-hidden rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
                                        >
                                            {/* Button Background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                            
                                            {/* Button Content */}
                                            <div className="relative flex items-center justify-center">
                                                <span className="text-white">Get Started - It's Free</span>
                                                <ArrowRight className="w-5 h-5 ml-2 text-white transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            
                                            {/* Button Glow */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                        </Link>
                                    ) : null}
                                    
                                    <Link 
                                        href="/features" 
                                        className="group relative overflow-hidden rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
                                    >
                                        {/* Button Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                        
                                        {/* Button Content */}
                                        <div className="relative flex items-center justify-center">
                                            <span className="text-white">Try Our Tools</span>
                                            <Sparkles className="w-5 h-5 ml-2 text-white" />
                                        </div>
                                        
                                        {/* Button Glow */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                    </Link>
                                </div>

                                {/* Secondary CTA Row */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {!user ? (
                                        <Link 
                                            href="/login" 
                                            className="group relative backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 rounded-xl px-6 py-3 font-medium transition-all duration-300 hover:border-white/30"
                                        >
                                            <span className="text-gray-200">Existing User? Log In</span>
                                        </Link>
                                    ) : null}
                                    
                                    <Link 
                                        href="/features" 
                                        className="group flex items-center justify-center text-cyan-300 hover:text-cyan-200 px-6 py-3 font-medium transition-all duration-300"
                                    >
                                        <span>Learn More About Features</span>
                                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex flex-wrap items-center justify-center gap-6">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                                        <span className="text-sm text-gray-400">256-bit AES Encryption</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse mr-2"></div>
                                        <span className="text-sm text-gray-400">Zero-Knowledge Architecture</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse mr-2"></div>
                                        <span className="text-sm text-gray-400">End-to-End Secure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;