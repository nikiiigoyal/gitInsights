
import { useState } from 'react';
import SearchForm from './components/form/SearchForm';
import UserProfile from './components/user/UserProfile';
import { HomePage } from './pages/HomePage';
const App = () => {
  const [userName, setUserName] = useState('quincylarson');
  return (
    <main className='mx-auto max-w-6xl px-8 py-20'>
      <HomePage />
<SearchForm  userName={userName} setUserName={setUserName} />
<UserProfile userName={userName} />
    </main>
  );
};
export default App;