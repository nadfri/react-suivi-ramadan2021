import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-svh bg-linear-to-b from-slate-50 to-white flex flex-col">
      <header className="bg-emerald-700 h-14 sm:h-20 flex items-center justify-center text-white font-bold">
        <span className="text-xl sm:text-2xl">Suivi Ramadan</span>
      </header>

      <div className="flex-1 grid place-content-center gap-6 px-4 py-6">
        <p className="text-center text-sm text-slate-600 max-w-sm mx-auto">
          Accédez à votre suivi en toute sécurité et suivez votre progression.
        </p>

        <div className="max-w-md w-full mx-auto bg-white border border-slate-200 shadow-lg rounded-3xl p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
