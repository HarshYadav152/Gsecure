"use client"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

    // Check if user is logged in on initial load
  useEffect(() => {
    console.log("user status checkrf : ")
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
  try {
    console.log("check user status running ")
    if (typeof window === 'undefined') {
      console.log("checkUserStatus skipped on server");
      return;
    }

    setLoading(true);

    const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';
    const response = await fetch(`${apiHost}/api/v1/auth/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();

    if (data.data) {
      setUser(data.data.user);
      setAuthenticated(true);
    } else {
      setUser(null);
      setAuthenticated(false);
      Cookies.remove('authToken');
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    setUser(null);
    setAuthenticated(false);
    Cookies.remove('authToken');
  } finally {
    setLoading(false);
  }
};

  // logout function
  const logout = async (message) => {
    try {
      if (typeof window === 'undefined') return;
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || '';

        await fetch(`${apiHost}/api/v1/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      // Clear user state and localStorage
      setUser(null);
      setAuthenticated(false);

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