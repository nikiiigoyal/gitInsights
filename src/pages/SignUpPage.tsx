/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/SignUpPage.tsx - Updated to work with new App.tsx
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '../App'; // Import from App.tsx
import { signInWithGoogle } from '../lib/supabase';
import { toast } from 'sonner';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signup(email, password);
      
      if (result.success) {
        toast.success("Account created successfully! Please check your email to confirm your account.");
        // Note: With Supabase, users might need to confirm their email before being fully authenticated
        // You might want to redirect to a confirmation page instead
        navigate('/dashboard');
      } else {
        toast.error(result.error || "Signup failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message);
      }
      // Success will be handled by the auth state change listener
    } catch (error) {
      toast.error("Failed to sign up with Google");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleTwitterSignUp = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { error } = await signInWithTwitter();
  //     if (error) {
  //       toast.error(error.message);
  //     }
  //     // Success will be handled by the auth state change listener
  //   } catch (error) {
  //     toast.error("Failed to sign up with Twitter");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-slate-600 flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader className="text-center space-y-4">
          {/* Orange shield icon */}
          <div className="mx-auto w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center">
            <div className="text-white text-xl">★</div>
          </div>
          <CardTitle className="text-slate-800">Github Users</CardTitle>
          
          {/* Tab navigation */}
          <div className="flex justify-center">
            <div className="flex border-b">
              <Link 
                to="/login" 
                className="px-8 py-2 text-slate-400 hover:text-slate-800"
              >
                Log In
              </Link>
              <button className="px-8 py-2 text-slate-800 border-b-2 border-orange-500">
                Sign Up
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Social buttons */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            </svg>
            Sign up with Google
          </Button>
          
          {/* <Button 
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={handleTwitterSignUp}
            disabled={isLoading}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Sign up with Twitter
          </Button> */}

          <div className="text-center text-slate-500">or</div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="yours@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-100"
              required
              disabled={isLoading}
            />
            
            <Input
              type="password"
              placeholder="create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-100"
              required
              minLength={6}
              disabled={isLoading}
            />

            <Input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-100"
              required
              minLength={6}
              disabled={isLoading}
            />

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "SIGN UP →"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;