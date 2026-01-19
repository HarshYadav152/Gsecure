"use client"
import React from 'react';
import { Key, AlertTriangle, Lock, Zap, Cpu } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Features = () => {
  const router = useRouter();

  const handleGeneratePassword = () => {
    router.push('/features/generate-password');
  };

  const handleBreachCheck = () => {
    router.push('/features/breach-check');
  };

  const handleStrengthCheck = () => {
    router.push('/features/strength-check');
  };

  const features = [
    {
      id: 1,
      title: 'Password Generator',
      icon: <Key className="w-10 h-10" />,
      description: 'Create ultra-secure passwords with advanced cryptographic algorithms. Customize length, complexity, and character sets.',
      action: handleGeneratePassword,
      gradient: 'from-red-900/20 to-orange-900/20',
      glow: 'red',
      accent: 'bg-gradient-to-r from-red-500 to-orange-500'
    },
    {
      id: 2,
      title: 'Breach Checker',
      icon: <AlertTriangle className="w-10 h-10" />,
      description: 'Scan across 15+ billion breached records. Get instant alerts if your credentials appear in public databases.',
      action: handleBreachCheck,
      gradient: 'from-rose-900/20 to-pink-900/20',
      glow: 'rose',
      accent: 'bg-gradient-to-r from-rose-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Strength Analyzer',
      icon: <Lock className="w-10 h-10" />,
      description: 'Advanced entropy calculation and brute-force simulation. Get detailed security reports and improvement suggestions.',
      action: handleStrengthCheck,
      gradient: 'from-violet-900/20 to-purple-900/20',
      glow: 'violet',
      accent: 'bg-gradient-to-r from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10 relative">
            {/* Glass Header Container */}
            <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
              {/* Glow Effect */}
              {/* <div className="absolute -inset-0.5 rounded-3xl blur opacity-30"></div> */}
              
              <div className="relative">
                {/* Animated Icon */}
                {/* <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur opacity-30 animate-pulse"></div>
                    <div className="relative p-6 bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl shadow-2xl">
                      <Shield className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                      <Sparkles className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </div> */}
                
                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Advanced{' '}
                  </span>
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                    Security Tools
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                  Enterprise-grade security features powered by military-grade encryption and real-time threat intelligence
                </p>
                
                {/* Animated Underline */}
                <div className="flex justify-center">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="group relative"
              >
                {/* Glow Container */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Feature Card */}
                <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full">
                  
                  {/* Icon Container */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      <div className={`absolute -inset-4 ${feature.gradient} rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      <div className={`relative p-5 rounded-2xl ${feature.accent} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-8 text-center leading-relaxed text-sm">
                    {feature.description}
                  </p>

                  {/* Stats/Info */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 text-amber-400 mr-2" />
                        <span className="text-xs text-gray-400">Real-time</span>
                      </div>
                      <div className="flex items-center">
                        <Cpu className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-xs text-gray-400">AI-Powered</span>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={feature.action}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 relative overflow-hidden`}
                  >
                    {/* Button Background */}
                    <div className={`absolute inset-0 ${feature.accent} opacity-100 group-hover:opacity-90 transition-opacity`}></div>
                    
                    {/* Button Text */}
                    <div className="relative flex items-center justify-center">
                      <span className="text-white">Access Tool</span>
                      <svg className="w-5 h-5 ml-2 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-transparent to-purple-500/10 rounded-3xl blur opacity-30"></div>
            
            <div className="relative text-center">
              <h3 className="text-3xl font-bold text-white mb-6">
                Complete Security Ecosystem
              </h3>
              
              <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
                All tools integrate seamlessly to provide multi-layered protection for your entire digital identity
              </p>
              
              {/* Feature Tags */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[
                  { text: '256-bit Encryption', color: 'from-red-500 to-orange-500' },
                  { text: 'Zero-Knowledge', color: 'from-rose-500 to-pink-500' },
                  { text: 'Real-time Alerts', color: 'from-violet-500 to-purple-500' },
                  { text: 'Cloud Sync', color: 'from-blue-500 to-cyan-500' },
                  { text: 'Multi-Factor', color: 'from-emerald-500 to-green-500' },
                  { text: 'Audit Logs', color: 'from-amber-500 to-yellow-500' },
                ].map((tag, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${tag.color} rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity`}></div>
                    <span className="relative px-5 py-2.5 bg-gray-900/80 text-gray-300 rounded-full text-sm border border-gray-700 group-hover:border-transparent transition-all duration-300">
                      {tag.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Security Metrics */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
                {[
                  { value: '15B+', label: 'Records Scanned', icon: '🔍' },
                  { value: '99.9%', label: 'Accuracy Rate', icon: '🎯' },
                  { value: '<50ms', label: 'Response Time', icon: '⚡' },
                  { value: '256-bit', label: 'Encryption', icon: '🔒' },
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-400 text-sm flex items-center justify-center">
                      <span className="mr-2">{metric.icon}</span>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;