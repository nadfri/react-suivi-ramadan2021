import { Outlet } from 'react-router-dom';
import PWABadge from '@features/PWA/PWABadge.tsx';
import { NavBar } from '@components/ui/NavBar/NavBar';

function App() {
  return (
    <div className="flex flex-col h-svh overflow-hidden border border-red-500 container mx-auto ">
      <header className="bg-white border-b border-gray-200">
        
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <Outlet />
      </main>

      <NavBar />

      <PWABadge />
    </div>
  );
}

export default App;
