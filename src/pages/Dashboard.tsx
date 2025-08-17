// src/pages/Dashboard.tsx - This contains your existing GitHub search functionality
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../App';
// Import your existing components (keep them as they are!)
import SearchForm from '../components/form/SearchForm';
import UserProfile from '../components/user/UserProfile';

const Dashboard = () => {
  // Your existing state
  const [userName, setUserName] = useState('quincylarson');
  
  // Authentication functionality
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Extract first letter of user's name/email for the avatar
  const getInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen">
      {/* Centered header with logo-style avatar */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-8 py-6      
      
  bg-white
  text-center
  grid
  grid-cols-[auto_auto_100px]
  justify-center
  items-center
  gap-6      <!-- 1.5rem -->">
          <div className="flex items-center justify-center space-x-4">
            {/* Logo-style avatar with user initial */}
            <div className="flex items-center justify-center w-8 h-8 bg-[#689f38] text-white rounded-full font-semibold text-lg p-3">
              {getInitial()}
            </div>
            
            {/* Welcome message */}
            <span className="text-gray-600">
              Welcome, <strong className='uppercase'>{userName || user?.email}</strong>
            </span>
            
            {/* Logout button */}
            <Button onClick={handleLogout} variant="outline" size="sm" className=' bg-transparent
  border-transparent
  text-[1.2rem]
  capitalize
  tracking-[0.1rem]
  text-[#617d98]
  cursor-pointer'>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Your existing main content - KEEP EXACTLY AS IT IS */}
      <main className='mx-auto px-8  bg-[#f1f5f8]'>
        <SearchForm userName={userName} setUserName={setUserName} />
        <UserProfile userName={userName} />
      </main>
    </div>
  );
};

export default Dashboard;