import { CgArrowTopRight, CgArrowBottomRight, CgArrowLongRight } from 'react-icons/cg';

type Props = {
  weight: number;
};

export function WeightBadge({ weight }: Props) {
  const initialWeigth = 75.0; // This should ideally come from props or context
  const diff = weight - initialWeigth;
  const absDiff = Math.abs(diff).toFixed(1);

  const status = diff > 0 ? 'gain' : diff < 0 ? 'loss' : 'stable';

  const weightConfig = {
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

  const { color, icon, label } = weightConfig[status];

  return (
    <div className="flex flex-col justify-center">
      <span className="text-sm font-extrabold text-slate-700">{weight}kgs</span>

      <div className={`flex justify-center ${color}`}>
        {icon} {label && <span className="text-[11px] font-bold ml-0.5">{label}</span>}
      </div>
    </div>
  );
}
