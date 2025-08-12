/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// src/App.tsx - Updated with Supabase authentication
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext, useEffect } from 'react';
import { type User } from '@supabase/supabase-js';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import { supabase, signInWithEmail, signUpWithEmail, signOut } from './lib/supabase';

// Authentication Context - Enhanced for Supabase
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route - Only authenticated users can access
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  // Enhanced authentication state for Supabase
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // Initialize Supabase auth state
  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getInitialUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Supabase login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await signInWithEmail(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Supabase signup function
  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await signUpWithEmail(email, password);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        return { success: true };
      }
      
      return { success: false, error: 'Signup failed' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Supabase logout function
  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, signup, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;