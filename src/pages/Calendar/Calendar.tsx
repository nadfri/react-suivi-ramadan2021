import { Card } from '@components/Card/Card';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';

export default function Calendar() {
  return (
    <div className="space-y-4">
      <ProgressBar />

      <Card day={new Date()} weight={75} fasting="fasting" />
      <Card day={new Date()} weight={76} fasting="not-fasting" />
      <Card day={new Date()} weight={74.8} />
      <Card day={new Date()} weight={75.8} fasting="fasting" />
      <Card day={new Date()} weight={71} fasting="not-fasting" />
      <Card day={new Date()} weight={74} />
    </div>
  );
}
