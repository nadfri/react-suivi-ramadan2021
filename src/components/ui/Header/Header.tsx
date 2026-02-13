import { formatHijri, getHijriToday } from '@misque/hijri';

export function Header() {
  const today = new Date();
  const hijriDate = formatHijri(getHijriToday());

  const localDate = today.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-emerald-700 h-14 sm:h-20 flex flex-col items-center justify-center text-white font-bold">
      <div className="text-2xl">{hijriDate}</div>
      <div className="text-xs sm:text-sm text-emerald-100">{localDate}</div>
    </header>
  );
}
