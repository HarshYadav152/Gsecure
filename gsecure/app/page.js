import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Welcome = () => {
    const { user } = useAuth();
    
    const features = [
        {
            icon: "🔒",
            title: "Encrypted Vault",
            description: "Military-grade encryption keeps your passwords secure"
        },
        {
            icon: "🌍",
            title: "Access Anywhere",
            description: "Your passwords sync across all your devices"
        },
        {
            icon: "🔑",
            title: "Password Generator",
            description: "Create unbreakable passwords instantly"
        },
        {
            icon: "🛡️",
            title: "Zero Knowledge",
            description: "Only you can access your data, ever"
        },
        {
            icon: "⚠️",
            title: "Breach Monitor",
            description: "Get alerts if your passwords are compromised"
        },
        {
            icon: "⚡",
            title: "Auto-Fill",
            description: "Sign in to sites with one click"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="text-7xl">🔐</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">G-Secure</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
                        Your passwords deserve better. Secure them with military-grade encryption and never forget a login again.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        {!user && (
                            <Link 
                                to="/signup" 
                                className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
                            >
                                <span className="relative z-10">Start Free Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        )}
                        <Link 
                            to="/features/demo" 
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Everything you need to stay secure
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border-l-4 border-yellow-400 rounded-2xl p-8 backdrop-blur-sm">
                        <p className="text-2xl text-gray-200 italic mb-4">
                            "The only password you'll ever need to remember is your master password. Let G-Secure handle the rest."
                        </p>
                        <p className="text-gray-400 font-semibold">— Security Experts Worldwide</p>
                    </div>
                </div>

                {/* Bottom CTA */}
                {!user && (
                    <div className="text-center">
                        <p className="text-gray-300 mb-6 text-lg">
                            Already have an account?
                        </p>
                        <Link 
                            to="/login" 
                            className="inline-block bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Sign In Here
                        </Link>
                    </div>
                )}
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Welcome;