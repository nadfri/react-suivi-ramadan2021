import { Outlet } from 'react-router-dom';
import PWABadge from '@components/PWA/PWABadge';
import { NavBar } from '@components/ui/NavBar/NavBar';
import { Header } from '@components/ui/Header/Header';

function App() {
  return (
    <div className="flex flex-col h-svh overflow-hidden container mx-auto bg-slate-50 shadow">
      <Header />

      <main className="flex-1 container mx-auto pt-2 pb-24 px-4 overflow-y-auto scroll-smooth">
        <Outlet />
      </main>

      <NavBar />

      <PWABadge />
    </div>
  );
}

export default App;
