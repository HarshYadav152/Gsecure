import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Key, AlertTriangle, Lock } from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();

  const handleGeneratePassword = () => {
    navigate('/features/generate');
  };

  const handleBreachCheck = () => {
    navigate('/features/breach');
  };

  const handleStrengthCheck = () => {
    navigate('/features/strength');
  };

  const features = [
    {
      id: 1,
      title: 'Generate Password',
      icon: <Key className="w-10 h-10" />,
      description: 'Create ultra-secure passwords with our advanced generator that combines random characters, numbers, and special symbols.',
      action: handleGeneratePassword,
      color: 'bg-red-900 hover:bg-red-800'
    },
    {
      id: 2,
      title: 'Breach Check',
      icon: <AlertTriangle className="w-10 h-10" />,
      description: 'Check if your passwords have been compromised in known data breaches. We\'ll search across public database using haveibeenpawned API of breached credentials.',
      action: handleBreachCheck,
      color: 'bg-rose-900 hover:bg-rose-800'
    },
    {
      id: 3,
      title: 'Strength Check',
      icon: <Lock className="w-10 h-10" />,
      description: 'Test how strong your existing passwords are against brute force attacks and get personalized recommendations.',
      action: handleStrengthCheck,
      color: 'bg-pink-900 hover:bg-pink-800'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-red-900 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Security <span className="text-red-500">Features</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Secure your digital life with our powerful suite of security tools
          </p>
          
          <div className="w-24 h-1 bg-red-700 mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20"
            >
              {/* Icon */}
              <div className={`mb-6 p-4 ${feature.color.split(' ')[0]} rounded-2xl w-fit mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-8 text-center leading-relaxed">
                {feature.description}
              </p>

              {/* Button */}
              <button
                onClick={feature.action}
                className={`w-full py-3 px-6 ${feature.color} text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg`}
              >
                Access Tool
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Comprehensive Security Suite
            </h3>
            <p className="text-gray-400 mb-6">
              All tools work together to provide complete protection for your digital identity
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-red-950 text-red-300 rounded-full text-sm border border-red-900">
                End-to-end Encryption
              </span>
              <span className="px-4 py-2 bg-rose-950 text-rose-300 rounded-full text-sm border border-rose-900">
                Real-time Monitoring
              </span>
              <span className="px-4 py-2 bg-pink-950 text-pink-300 rounded-full text-sm border border-pink-900">
                Privacy First
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;