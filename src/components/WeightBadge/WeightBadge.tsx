import { WeightTrend } from './WeightTrend';

type Props = {
  weight: number;
  baseline?: number;
};

export function WeightBadge({ weight, baseline = 75.0 }: Props) {
  return (
    <div className="flex flex-col justify-center">
      <span className="text-sm font-extrabold text-slate-700">{weight}kgs</span>
      <WeightTrend current={weight} baseline={baseline} className="mt-0.5" />
    </div>
  );
}
