"use client"
import React from 'react';
import { Cookie, ShieldCheck, BarChart, Settings, Info, XCircle } from 'lucide-react';

const sections = [
  {
    icon: <Info className="w-6 h-6" />,
    title: 'What Are Cookies?',
    content: `Cookies are small text files stored on your device by your web browser. They help websites remember your preferences, authentication status, and browsing patterns. Cookies are essential for many website features to function correctly and provide a seamless user experience.`,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Essential / Authentication Cookies',
    content: `We use essential cookies to keep you logged in across sessions and maintain your authentication state. These cookies are required for the core functionality of G-Secure — including accessing your vault, generating passwords, and checking breaches. Without these cookies, the service cannot operate properly.`,
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: 'Analytics Cookies',
    content: `We use analytics cookies to understand how users interact with G-Secure. This helps us identify which features are most popular, detect performance issues, and prioritize improvements. The data collected is aggregated and anonymized — we never track individual browsing behavior outside our platform.`,
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Preference Cookies',
    content: `Preference cookies remember your settings and choices on G-Secure, such as theme preferences, language selections, and feature configurations. These cookies ensures a consistent and personalized experience every time you return to our platform.`,
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: <XCircle className="w-6 h-6" />,
    title: 'How to Disable Cookies',
    content: `You can manage cookie preferences through your browser settings at any time. Most browsers allow you to block or delete cookies entirely, or configure settings per site. Note that disabling essential cookies may prevent G-Secure from functioning correctly — particularly authentication features and vault access.`,
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: <Cookie className="w-6 h-6" />,
    title: 'Third-Party Cookies',
    content: `We minimize the use of third-party cookies. Any third-party services we integrate with (such as analytics providers) are vetted for privacy compliance and used solely for service improvement. We do not allow third-party advertising cookies or tracking for marketing purposes on G-Secure.`,
    color: 'from-indigo-500 to-blue-500'
  }
];

const CookiePolicy = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-3xl blur opacity-30"></div>

            <div className="relative">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-30 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl shadow-2xl">
                      <Cookie className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-white bg-clip-text text-transparent">
                    Cookie Policy
                  </span>
                </h1>
                <p className="text-gray-400 text-sm">Last updated: May 2025</p>
                <div className="flex justify-center mt-6">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                  This Cookie Policy explains how G-Secure uses cookies and similar tracking technologies to provide and improve our service.
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
                  For questions about our cookie usage, contact us at{' '}
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

export default CookiePolicy;
