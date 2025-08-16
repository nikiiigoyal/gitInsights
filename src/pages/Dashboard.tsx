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

  return (
    <div className="min-h-screen">
      {/* Simple header with logout */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-6xl px-8 py-4">
          <div className="flex items-center justify-between">
           
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Your existing main content - KEEP EXACTLY AS IT IS */}
      <main className='mx-auto max-w-6xl px-8 py-20'>
        <SearchForm userName={userName} setUserName={setUserName} />
        <UserProfile userName={userName} />
      </main>
    </div>
  );
};

export default Dashboard;