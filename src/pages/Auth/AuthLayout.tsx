import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <header className="sticky top-0 bg-emerald-700 h-14 sm:h-20 flex items-center justify-center text-white font-bold">
        <span className="text-xl sm:text-2xl">Suivi Ramadan</span>
      </header>

      <main className="flex-1 py-6 px-3 sm:px-4 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
