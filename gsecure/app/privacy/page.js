"use client"
import React from 'react';
import { Shield, Lock, Eye, Cookie, UserCheck, Mail } from 'lucide-react';

const sections = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Data Collection & Usage',
    content: `We collect only the minimum data necessary to provide our password management service. This includes your email address (for account creation and recovery), encrypted password vault data, and basic usage analytics to improve our service. We never collect, store, or have access to your master password or the contents of your vault.`,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Encryption Standards',
    content: `All data is encrypted using AES-256 encryption before leaving your device. Your vault data is encrypted and decrypted entirely on your device using your master password. We use TLS 1.3 for all data in transit, ensuring your information remains protected from interception at every stage.`,
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Zero-Knowledge Architecture',
    content: `G-Secure operates on a zero-knowledge architecture. This means your master password, vault contents, and any data stored within are completely inaccessible to us. We cannot read, recover, or reset your master password. Your data is encrypted with keys that only you possess, ensuring complete privacy.`,
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: <Cookie className="w-6 h-6" />,
    title: 'Cookies & Tracking',
    content: `We use essential cookies for authentication and session management. These are strictly necessary for the operation of our service. We also use analytics cookies to understand how our service is used and to improve user experience. You can control cookie preferences in your browser settings.`,
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Your Rights',
    content: `You have the right to access, update, or delete your account and associated data at any time. You can export your vault data, modify your personal information, or request complete account deletion from your account settings. We will process all data requests within 30 days as required by applicable regulations.`,
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Contact & Data Protection',
    content: `If you have questions about this privacy policy or wish to exercise your data rights, please contact our Data Protection team. We are committed to resolving any privacy concerns promptly and transparently. For data protection matters, we comply with GDPR, CCPA, and other applicable privacy regulations.`,
    color: 'from-indigo-500 to-blue-500'
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-amber-500/20 rounded-3xl blur opacity-30"></div>

            <div className="relative">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-30 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl shadow-2xl">
                      <Shield className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                    Privacy Policy
                  </span>
                </h1>
                <p className="text-gray-400 text-sm">Last updated: May 2025</p>
                <div className="flex justify-center mt-6">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                  At G-Secure, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you use our password management service.
                </p>
              </div>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${section.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                          <div className="text-white">{section.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                          <p className="text-gray-300 leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">
                  If you have any questions about our privacy practices, please contact us at{' '}
                  <a href="mailto:privacy@gsecure.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                    privacy@gsecure.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
