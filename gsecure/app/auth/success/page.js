"use client"
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

// Post-OAuth interstitial.
//
// GitHub OAuth (and the password login) issue the `authToken` cookie on a
// redirect response. A few browsers don't make that freshly-Set-Cookie value
// available to the very next navigation, so landing straight on /vault could
// show a logged-out state until a manual refresh. This page instead confirms
// the session is live by calling /api/v1/auth/me (which reads the cookie) and
// only forwards to /vault once that succeeds. Because the cookie can lag by a
// moment, the check retries a few times before giving up and sending the user
// back to /login.
const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 400;

function AuthSuccess() {
    const { setUser, setAuthenticated } = useAuth();
    const router = useRouter();
    const [status, setStatus] = useState('Confirming your secure session...');
    // Guards against React StrictMode's double-invoked effect in development
    // and against state updates / duplicate redirects after unmount.
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        let active = true;
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

        const confirmSession = async () => {
            for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
                try {
                    const response = await fetch(`${apiHost}/api/v1/auth/me`, {
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data?.data?.user) {
                            if (!active) return;
                            setUser(data.data.user);
                            setAuthenticated(true);
                            setStatus('Success! Redirecting to your vault...');
                            router.replace('/vault');
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Session confirmation attempt failed:', error);
                }

                // Cookie may not be readable yet, wait and retry.
                if (attempt < MAX_ATTEMPTS) {
                    if (!active) return;
                    setStatus('Verifying your login...');
                    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
                }
            }

            if (!active) return;
            setStatus('Could not confirm your session. Redirecting to login...');
            toast.error('We could not confirm your session. Please sign in again.');
            router.replace('/login');
        };

        confirmSession();

        return () => {
            active = false;
        };
    }, [router, setUser, setAuthenticated]);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-amber-500/10 to-orange-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-l from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main content with glass effect */}
            <div className="relative z-10 w-full max-w-md px-2 py-2">
                <div className="relative rounded-3xl p-8 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-2xl">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-transparent to-blue-500/30 rounded-3xl blur opacity-30"></div>

                    {/* Inner content */}
                    <div className="relative text-center">
                        {/* Lock icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                            Finishing sign-in
                        </h2>

                        {/* Spinner + status */}
                        <div className="mt-6 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-gray-300 text-sm" aria-live="polite">{status}</span>
                        </div>

                        {/* Security note */}
                        <div className="mt-8 p-3 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50">
                            <div className="flex items-start">
                                <svg className="w-4 h-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs text-gray-400">
                                    Verifying your encrypted session before opening your vault
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthSuccess;
