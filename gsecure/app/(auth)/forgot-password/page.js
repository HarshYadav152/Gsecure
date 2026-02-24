"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Eye, EyeOff, KeyRound, Mail, Lock } from 'lucide-react';

function ForgotPassword(props) {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [otp, setOtp] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setErrors("");
        if (!identifier.trim()) {
            setErrors("Email or username is required");
            return;
        }

        try {
            setIsLoading(true);
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/forgot-password`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result?.message || "Failed to send OTP");
                return;
            }

            if (result.success) {
                toast.success(result.message);
                setStep(2); // Move to OTP verification step
            } else {
                setErrors(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Encounter some error :", error);
            setErrors("Request failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setErrors("");
        if (!otp.trim()) {
            setErrors("OTP is required");
            return;
        }

        try {
            setIsLoading(true);
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/verify-otp`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, otp }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result?.message || "Failed to verify OTP");
                return;
            }

            if (result.success) {
                toast.success("OTP Verified Successfully");
                setResetToken(result.resetToken);
                setStep(3); // Move to reset password step
            } else {
                setErrors(result.message || "Invalid OTP");
            }
        } catch (error) {
            console.error("Encounter some error :", error);
            setErrors("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrors("");
        if (!newPassword.trim() || newPassword.length < 6) {
            setErrors("Password must be at least 6 characters long");
            return;
        }

        try {
            setIsLoading(true);
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/reset-password`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetToken, newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(result?.message || "Failed to reset password");
                return;
            }

            if (result.success) {
                toast.success("Password reset successfully!");
                router.push("/login");
            } else {
                setErrors(result.message || "Failed to reset password");
            }
        } catch (error) {
            console.error("Encounter some error :", error);
            setErrors("Request failed. Please try again.");
        } finally {
            setIsLoading(false);
            setNewPassword("");
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden ">

                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

                    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-linear-to-r from-amber-500/10 to-orange-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-linear-to-l from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl"></div>

                    <div className="absolute inset-0 bg-[url('/api/placeholder/800/800')] opacity-[0.02]"></div>
                </div>

                <div className="relative z-10 w-full max-w-md px-2 py-2">
                    <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-linear-to-br from-white/5 to-white/10 border border-white/20 shadow-2xl">

                        <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/30 via-transparent to-blue-500/30 rounded-3xl blur opacity-30"></div>

                        <div className="relative">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                                        <KeyRound className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    Reset Password
                                </h2>
                                <p className="mt-3 text-gray-400 text-sm">
                                    {step === 1 && "Enter your email or username to receive an OTP"}
                                    {step === 2 && "Enter the 6-digit OTP sent to your email"}
                                    {step === 3 && "Create a new secure password"}
                                </p>
                            </div>

                            {/* Error message */}
                            {errors && (
                                <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-900/30 to-red-800/20 border border-red-500/30 backdrop-blur-sm transition-all">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-300 text-sm">{errors}</span>
                                    </div>
                                </div>
                            )}

                            {/* Form Steps */}

                            {/* Step 1: Request OTP */}
                            {step === 1 && (
                                <form onSubmit={handleRequestOtp} className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Email or Username
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Enter email or username"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`group relative w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                                        style={{ background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)' }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Sending OTP...</span>
                                            </div>
                                        ) : (
                                            "Send OTP"
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Step 2: Verify OTP */}
                            {step === 2 && (
                                <form onSubmit={handleVerifyOtp} className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            One-Time Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-widest text-center text-lg"
                                                placeholder="------"
                                                maxLength="6"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`group relative w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                                        style={{ background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)' }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Verifying...</span>
                                            </div>
                                        ) : (
                                            "Verify OTP"
                                        )}
                                    </button>
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-xs text-gray-400 hover:text-amber-400"
                                        >
                                            Change Email/Username
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Step 3: Reset Password */}
                            {step === 3 && (
                                <form onSubmit={handleResetPassword} className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <KeyRound className="h-5 w-5 text-gray-500" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                disabled={isLoading}
                                                className="block w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                placeholder="Enter new password (min 6 chars)"
                                                required
                                                minLength={6}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`group relative w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
                                        style={{ background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)' }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Updating Password...</span>
                                            </div>
                                        ) : (
                                            "Reset Password"
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Back to Login link */}
                            <div className="text-center pt-6 mt-4 border-t border-white/10">
                                <p className="text-gray-400 text-sm">
                                    Remembered your password?{' '}
                                    <Link
                                        href="/login"
                                        className="font-medium bg-linear-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent hover:from-amber-400 hover:to-orange-500 transition-all"
                                    >
                                        Back to Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
