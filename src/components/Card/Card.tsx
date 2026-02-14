import './Card.css';
import { WeightBadge } from '@components/WeightBadge/WeightBadge';
import type { FastingType } from 'src/types/types';
import { FastingBadge } from '@components/FastingBadge/FastingBadge';
import { toHijri } from '@misque/hijri';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

type Props = {
  day: Date;
  weight?: number;
  fasting?: FastingType;
};

export function Card({ day, weight, fasting = 'unknown' }: Props) {
  const [open, setOpen] = useState(false);

  const hijriResult = toHijri(day);
  
  const ramadanDay = hijriResult.success ? hijriResult.data.day : '';

  const localDate = day.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <button
      className="w-full bg-white rounded-3xl px-4 p-1 h-24 shadow-sm border border-slate-100 flex items-center justify-between"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-4 ">
        <div className="text-center min-w-10 pr-4 border-r border-slate-200">
          <span className="text-3xl font-black text-slate-800 block leading-none">
            {ramadanDay}
          </span>
          <span className="text-[9px] font-bold text-slate-400">RAMADAN</span>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-slate-700 font-bold text-sm">{localDate}</p>
          <FastingBadge fasting={fasting} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {weight && <WeightBadge weight={weight} />}

        <IoIosArrowDown className={`size-6 text-slate-400 duration-200 ${open ? 'rotate-x-180' : ''}`} />
      </div>
    </button>
  );
}
