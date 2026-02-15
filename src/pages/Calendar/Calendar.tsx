import { Card } from '@components/Card/Card';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';

export default function Calendar() {
  const today = new Date();

  // Fonction pour créer une date relative à aujourd'hui
  const getRelativeDate = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
  };

  return (
    <div className="space-y-4">
      <ProgressBar />

      {/* Aujourd'hui */}
      <Card day={today}  />

      {/* Jours précédents */}
      <Card day={getRelativeDate(-1)} weight={76} fasting="not-fasting" />
      <Card day={getRelativeDate(-2)} weight={74.8} fasting="fasting" />
      <Card day={getRelativeDate(-3)} weight={75.8} fasting="fasting" />
      <Card day={getRelativeDate(-4)} weight={71} fasting="not-fasting" />
      <Card day={getRelativeDate(-5)} weight={74} fasting="fasting" />
    </div>
  );
}
