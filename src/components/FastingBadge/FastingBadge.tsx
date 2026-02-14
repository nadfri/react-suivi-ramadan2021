import type { FastingType } from 'src/types/types';
import { BiBadgeCheck, BiErrorAlt } from 'react-icons/bi';
import { PiQuestionBold } from 'react-icons/pi';

export function FastingBadge({ fasting }: { fasting: FastingType }) {
  const badgeConfig = {
    fasting: {
      label: 'Jeûné',
      color: 'bg-green-100 text-green-800',
      icon: <BiBadgeCheck className="size-4" aria-hidden="true" />,
    },
    'not-fasting': {
      label: 'Non Jeûné',
      color: 'bg-orange-100 text-orange-800',
      icon: <BiErrorAlt className="size-4" aria-hidden="true" />,
    },
    unknown: {
      label: 'Jeûné',
      color: 'bg-gray-100 text-gray-600',
      icon: <PiQuestionBold className="size-4" aria-hidden="true" />,
    },
  };

  const { label, color, icon } = badgeConfig[fasting];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-medium ${color}`}
    >
      {label}
      {icon}
    </span>
  );
}
