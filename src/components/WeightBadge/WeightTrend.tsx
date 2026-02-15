import { CgArrowTopRight, CgArrowBottomRight, CgArrowLongRight } from 'react-icons/cg';

type Props = {
  current: number;
  baseline: number;
  className?: string;
};

export function WeightTrend({ current, baseline, className = '' }: Props) {
  const diff = current - baseline;
  const absDiff = Math.abs(diff).toFixed(1);
  const status = diff > 0 ? 'gain' : diff < 0 ? 'loss' : 'stable';

  const config = {
    gain: {
      color: 'text-red-500',
      icon: <CgArrowTopRight className="size-4" />,
      label: `+${absDiff}`,
    },
    loss: {
      color: 'text-green-500',
      icon: <CgArrowBottomRight className="size-4" />,
      label: `-${absDiff}`,
    },
    stable: {
      color: 'text-blue-500',
      icon: <CgArrowLongRight className="size-4" />,
      label: '',
    },
  };

  const { color, icon, label } = config[status];

  return (
    <div
      className={`flex flex-col items-center transition-colors duration-300 ${color} ${className}`}
    >
      {icon}
      {label && (
        <span className="text-[10px] font-bold leading-none whitespace-nowrap">{label}</span>
      )}
    </div>
  );
}
