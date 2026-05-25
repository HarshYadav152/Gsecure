"use client"
import React from 'react';
import { FileText, UserCheck, Shield, Ban, AlertTriangle, Scale } from 'lucide-react';

const sections = [
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'User Responsibilities',
    content: `You are responsible for maintaining the confidentiality of your master password and account credentials. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate, current, and complete information during the registration process and keep this information updated.`,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Account Security',
    content: `You are solely responsible for all activities that occur under your account. G-Secure employs industry-standard security measures, but we cannot guarantee absolute security. We recommend using strong, unique passwords and enabling multi-factor authentication. We are not liable for losses resulting from compromised account credentials.`,
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: 'Acceptable Usage',
    content: `You agree to use G-Secure only for lawful purposes. You may not use our service to store illegal content, violate others' intellectual property rights, distribute malware, or engage in any activity that disrupts our infrastructure. We reserve the right to suspend or terminate accounts found in violation of these terms.`,
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Limitation of Liability',
    content: `G-Secure is provided "as is" without warranty of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability shall not exceed the amount paid by you for the service during the twelve months preceding the claim.`,
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Service Availability',
    content: `We strive to maintain 99.9% service availability but do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance. We are not liable for any damages resulting from service interruptions, data loss, or inability to access your account due to circumstances beyond our reasonable control.`,
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'Governing Law & Changes',
    content: `These terms are governed by applicable laws. We reserve the right to modify these terms at any time. Material changes will be communicated via email or through our platform. Continued use of G-Secure after changes constitute acceptance of the updated terms. It is your responsibility to review these terms periodically.`,
    color: 'from-indigo-500 to-blue-500'
  }
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-rose-500/20 rounded-3xl blur opacity-30"></div>

            <div className="relative">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur opacity-30 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl shadow-2xl">
                      <FileText className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-white bg-clip-text text-transparent">
                    Terms of Service
                  </span>
                </h1>
                <p className="text-gray-400 text-sm">Last updated: May 2025</p>
                <div className="flex justify-center mt-6">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                  By using G-Secure, you agree to the following terms and conditions. Please read them carefully before using our password management service.
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
                  For questions about these terms, contact us at{' '}
                  <a href="mailto:legal@gsecure.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                    legal@gsecure.com
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

export default TermsOfService;
