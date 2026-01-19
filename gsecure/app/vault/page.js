"use client"
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Plus, RefreshCw, Lock, Globe, User, FileText, Shield, Key, ExternalLink } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Vault() {
    const [showPassword, setShowPassword] = useState({});
    const [passwords, setPasswords] = useState([]);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const router = useRouter()

    const handleAdd = () => {
        router.push("/vault/add");
    };

    const handleCopyPassword = async (encryptedPassword, id) => {
        const keyword = prompt("🔐 Enter your decryption keyword:");
        if (!keyword) {
            alert("Keyword is required to decrypt the password.");
            return;
        }
    
        try {
            if (!decrypted) {
                alert("❌ Failed to decrypt password. Incorrect keyword.");
                return;
            }
    
            await navigator.clipboard.writeText(decrypted);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            alert("⚠️ An unexpected error occurred. Please try again.");
        }
    };
    
    const getSavedPassword = async (e) => {
        e?.preventDefault();
        setIsLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/vault/expose-vault`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result?.data?.count > 0 && Array.isArray(result.data.savedPass)) {
                setPasswords(result.data.savedPass);
                setStatus(`✅ Loaded ${result.data.count} passwords`);
            } else {
                setPasswords([]);
                setStatus('No passwords found');
            }
        } catch (error) {
            setPasswords([]);
            setStatus('⚠️ Session Expired. Please login again');
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-load passwords on component mount
    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            getSavedPassword();
        }
    }, []);

    return (
        <div className="min-h-screen">
            {/* Background Blur Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 mb-8">
                    {/* Glow Effect */}
                    {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur opacity-30"></div> */}
                    
                    <div className="relative">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-30 animate-pulse"></div>
                                    <div className="relative p-4 bg-gradient-to-br from-amber-900 to-yellow-900 rounded-2xl shadow-lg">
                                        <Lock className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                                        Password Vault
                                    </h1>
                                    <p className="text-gray-400 mt-1">Your secure password storage</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <button
                                    className="group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden"
                                >
                                    {/* Button Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-yellow-700 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                    {/* Button Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                    {/* Button Content */}
                                    <div className="relative flex items-center">
                                        <Shield className="w-5 h-5 mr-2" />
                                        <span>Secure Vault</span>
                                    </div>
                                </button>
                                
                                <button
                                    onClick={handleAdd}
                                    className="group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden"
                                >
                                    {/* Button Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                    {/* Button Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                    {/* Button Content */}
                                    <div className="relative flex items-center">
                                        <Plus className="w-5 h-5 mr-2" />
                                        <span>Add Password</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Stats and Status */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                                        {passwords.length}
                                    </div>
                                    <div className="text-sm text-gray-400">Passwords</div>
                                </div>
                                <div className="h-12 w-px bg-white/10"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-300">
                                        🔒
                                    </div>
                                    <div className="text-sm text-gray-400">AES-256</div>
                                </div>
                            </div>
                            
                            {status && (
                                <div className="flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-sm bg-gradient-to-r from-emerald-900/30 to-green-900/20 border border-emerald-900/30">
                                    <span className="text-emerald-300 text-sm">{status}</span>
                                </div>
                            )}
                            
                            <button
                                onClick={getSavedPassword}
                                disabled={isLoading}
                                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {/* Button Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                
                                {/* Button Content */}
                                <div className="relative flex items-center">
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            <span className="text-sm">Loading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Refresh</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password Cards Grid */}
                {passwords.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {passwords.map((password) => (
                            <div
                                key={password.id}
                                className="group relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative p-6">
                                    {/* Website Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gradient-to-r from-amber-900/50 to-yellow-900/50">
                                                <Globe className="w-5 h-5 text-amber-300" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <a
                                                    href={password.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-amber-300 hover:text-amber-200 hover:underline flex items-center gap-1"
                                                >
                                                    {password.website}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                                <p className="text-xs text-gray-400 truncate">Website</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="mb-4 p-3 rounded-lg backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs text-gray-400">Username</span>
                                        </div>
                                        <p className="text-gray-200 text-sm font-mono truncate">{password.username}</p>
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Key className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-400">Password</span>
                                            </div>
                                            <button
                                                onClick={() => setShowPassword(prev => ({
                                                    ...prev,
                                                    [password.id]: !prev[password.id]
                                                }))}
                                                className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                                            >
                                                {showPassword[password.id] ? (
                                                    <>
                                                        <EyeOff className="inline w-3 h-3 mr-1" />
                                                        Hide
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye className="inline w-3 h-3 mr-1" />
                                                        Show
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword[password.id] ? "text" : "password"}
                                                value={showPassword[password.id] ? "••••••••••••" : "••••••••••••"}
                                                readOnly
                                                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 text-gray-200 font-mono text-sm focus:outline-none"
                                            />
                                            <button
                                                onClick={() => handleCopyPassword(password.password, password.id)}
                                                className="absolute inset-y-0 right-0 px-4 border-l border-white/10 rounded-r-xl flex items-center justify-center hover:bg-white/5 transition-colors"
                                            >
                                                {copiedId === password.id ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                                        <span className="text-xs text-green-400">Copied!</span>
                                                    </div>
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {password.notes && (
                                        <div className="mt-4 p-4 rounded-xl backdrop-blur-sm bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-900/30">
                                            <div className="flex items-start gap-2">
                                                <FileText className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-amber-300 mb-1">Notes</p>
                                                    <p className="text-sm text-amber-200/80">{password.notes}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Security Badge */}
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                                <span className="text-xs text-gray-400">AES-256 Encrypted</span>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-amber-900/30 to-yellow-900/30 text-amber-300 border border-amber-900/30">
                                                Secure
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative backdrop-blur-xl bg-gradient-to-b from-white/5 to-white/10 rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur opacity-30"></div>
                        
                        <div className="relative">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full blur opacity-20"></div>
                                    <div className="relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                                        <Lock className="w-12 h-12 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-300 mb-3">Your Vault is Empty</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Start securing your digital life by adding your first password
                            </p>
                            
                            <button
                                onClick={handleAdd}
                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 overflow-hidden"
                            >
                                {/* Button Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                {/* Button Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                                {/* Button Content */}
                                <div className="relative flex items-center">
                                    <Plus className="w-5 h-5 mr-2" />
                                    <span>Add Your First Password</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-amber-900/30 to-yellow-900/20 text-amber-300 rounded-full border border-amber-900/30">
                            🔒 End-to-End Encrypted
                        </span>
                        <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-emerald-900/30 to-green-900/20 text-emerald-300 rounded-full border border-emerald-900/30">
                            ⚡ Zero-Knowledge Architecture
                        </span>
                        <span className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-full border border-blue-900/30">
                            🛡️ Military Grade Security
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vault;