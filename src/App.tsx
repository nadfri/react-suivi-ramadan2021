import { Outlet } from 'react-router-dom';
import PWABadge from './features/PWA/PWABadge.tsx';
import './App.css';

function App() {
  return (
    <div className="flex flex-col h-svh overflow-hidden border border-red-500">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Suivi Ramadan</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2026 Suivi Ramadan. All rights reserved.</p>
        </div>
      </footer>

      <PWABadge />
    </div>
  );
}

export default App;
