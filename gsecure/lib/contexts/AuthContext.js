"use client"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasCheckedAuth = useRef(false);

  const checkUserStatus = async () => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      // Get token from localStorage (cookies.get() is server-side only)
      const token = Cookies.getItem('accessToken');

      // If no token, user is not authenticated
      if (!token) {
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      // Use Next.js environment variable (NEXT_PUBLIC_ prefix for client-side)
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
      
      const response = await fetch(`${apiHost}/api/v1/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      
      if (data.data) {
        setUser(data.data);
        setAuthenticated(true);
      } else {
        // If API request fails, clear user data
        setUser(null);
        setAuthenticated(false);
        Cookies.remove('authToken');
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setUser(null);
      setAuthenticated(false);
      if (typeof window !== 'undefined') {
        Cookies.remove('authToken');
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    // Prevent double-checking in development due to React Strict Mode
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkUserStatus();
    }
  }, []);

  // logout function
  const logout = async (message) => {
    try {
      if (typeof window === 'undefined') return;

      const token = Cookies.get('authToken');
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

      // Optional: Make an API call to log out the user
      if (token) {
        await fetch(`${apiHost}/api/v1/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      // Clear user state and localStorage
      setUser(null);
      setAuthenticated(false);
      Cookies.remove("authToken")

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (message) {
        // Use browser's alert or replace with your toast notification
        if (typeof window !== 'undefined') {
          alert(message);
        }
      }

      // Redirect to the welcome page
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setAuthenticated(false);
      if (typeof window !== 'undefined') {
        Cookies.remove('authToken');
      }
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      authenticated,
      setAuthenticated,
      logout,
      checkUserStatus // Expose this for manual refresh if needed
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};