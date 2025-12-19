import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Lock, Globe, Key, AlertTriangle, Zap, ChevronRight } from 'lucide-react';

const Welcome = () => {
    const { user } = useAuth();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-800">
                    
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-800 blur-xl opacity-50 rounded-full"></div>
                                <div className="relative p-4 bg-gradient-to-r from-red-800 to-rose-900 rounded-2xl">
                                    <Shield className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">G-Secure</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
                            Your Modern Password Management Solution
                        </h2>
                        
                        <div className="w-32 h-1 bg-gradient-to-r from-red-700 to-rose-800 mx-auto rounded-full mb-8"></div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-400 mb-10 text-center max-w-3xl mx-auto leading-relaxed">
                        Say goodbye to password anxiety! <span className="font-semibold text-rose-400">G-Secure</span> is a sleek, secure, and user-friendly password manager designed to keep your credentials safe and always within reach.
                    </p>

                    {/* Features List */}
                    <div className="mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Lock className="w-6 h-6" />, text: "Store all your passwords in one encrypted vault", bg: "bg-red-900/30", border: "border-red-800/50" },
                                { icon: <Globe className="w-6 h-6" />, text: "Access them anytime, anywhere", bg: "bg-rose-900/30", border: "border-rose-800/50" },
                                { icon: <Key className="w-6 h-6" />, text: "Generate strong, unique passwords in seconds", bg: "bg-pink-900/30", border: "border-pink-800/50" },
                                { icon: <Shield className="w-6 h-6" />, text: "Ensuring Zero Knowledge protocol", bg: "bg-red-800/30", border: "border-red-700/50" },
                                { icon: <AlertTriangle className="w-6 h-6" />, text: "Check your password against any known breaches", bg: "bg-rose-800/30", border: "border-rose-700/50" },
                                { icon: <Zap className="w-6 h-6" />, text: "Auto-fill passwords across all your devices", bg: "bg-pink-800/30", border: "border-pink-700/50" }
                            ].map((feature, index) => (
                                <div 
                                    key={index}
                                    className={`${feature.bg} ${feature.border} border rounded-xl p-5 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 group`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-gradient-to-r from-red-700 to-rose-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                            <div className="text-white">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <span className="text-gray-200 text-lg font-medium pt-1">
                                            {feature.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quote Section */}
                    <div className="mb-12">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-900 to-rose-900 rounded-2xl blur opacity-30"></div>
                            <div className="relative bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                                <div className="flex items-start">
                                    <div className="text-4xl text-rose-500 mr-4">"</div>
                                    <blockquote className="italic text-gray-300 text-xl md:text-2xl leading-relaxed">
                                        Get started today and experience a safer, smarter way to manage your digital life. Stay secure with military-grade encryption and seamless access across all your devices.
                                    </blockquote>
                                    <div className="text-4xl text-rose-500 ml-4 self-end">"</div>
                                </div>
                                <div className="mt-6 text-right">
                                    <span className="text-rose-400 font-semibold">— G-Secure Team</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
                        {!user ? (
                            <Link 
                                to="/signup" 
                                className="relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-800 rounded-xl group-hover:from-red-600 group-hover:to-rose-700 transition-all duration-300"></div>
                                <div className="relative px-10 py-5 rounded-xl bg-gradient-to-r from-red-800 to-rose-900 text-white font-bold text-lg transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-900/30">
                                    Get Started - It's Free
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            </Link>
                        ) : null}
                        
                        <Link 
                            to="/features/demo" 
                            className="relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-800 rounded-xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300"></div>
                            <div className="relative px-10 py-5 rounded-xl bg-gradient-to-r from-green-800 to-emerald-900 text-white font-bold text-lg transform group-hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-900/30 flex items-center justify-center gap-2">
                                Try Demo Tools
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </Link>
                    </div>

                    {/* Secondary Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {!user ? (
                            <Link 
                                to="/login" 
                                className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-gray-600"
                            >
                                Existing User? Log In
                            </Link>
                        ) : null}
                        
                        <Link 
                            to="/features/demo" 
                            className="group flex items-center justify-center gap-2 text-rose-400 hover:text-rose-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-rose-950/30 border border-rose-900/30 hover:border-rose-700/50"
                        >
                            Learn More About Features
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Stats/Badges */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">AES-256</div>
                                <div className="text-sm text-gray-400">Encryption</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">100%</div>
                                <div className="text-sm text-gray-400">Zero Knowledge</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">∞</div>
                                <div className="text-sm text-gray-400">Unlimited Passwords</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-sm text-gray-400">Security Monitoring</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;