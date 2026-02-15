import './Card.css';
import { WeightBadge } from '@components/WeightBadge/WeightBadge';
import type { FastingType } from 'src/types/types';
import { FastingBadge } from '@components/FastingBadge/FastingBadge';
import { toHijri } from '@misque/hijri';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { CardForm } from './CardForm';

type Props = {
  day: Date;
  weight?: number;
  fasting?: FastingType;
};

export function Card({ day, weight, fasting = 'unknown' }: Props) {
  const [open, setOpen] = useState(false);
  const [savedWeight, setSavedWeight] = useState(weight || 75.0);
  const [savedFasting, setSavedFasting] = useState<FastingType>(fasting);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setOpen(false);
  useClickOutside(cardRef, handleClose);

  const hijriResult = toHijri(day);
  const ramadanDay = hijriResult.success ? hijriResult.data.day : '';

  const localDate = day.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSave = (newWeight: number, newFasting: FastingType) => {
    console.log('Saving:', { newWeight, newFasting });
    setSavedWeight(newWeight);
    setSavedFasting(newFasting);
    setOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="w-full bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`actions-${ramadanDay}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 h-24 hover:bg-slate-50/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="text-center min-w-10 pr-4 border-r border-slate-200">
            <span className="text-3xl font-black text-slate-800 block leading-none">
              {ramadanDay}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Ramadan</span>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <p className="text-slate-700 font-bold text-sm">{localDate}</p>
            <FastingBadge fasting={savedFasting} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {savedWeight > 0 && <WeightBadge weight={savedWeight} />}
          <IoIosArrowDown
            className={`size-6 text-slate-400 duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </button>

      <div
        id={`actions-${ramadanDay}`}
        className={`grid transition-[grid-template-rows,visibility] duration-200 ease-in-out ${
          open ? 'grid-rows-[1fr] visible' : 'grid-rows-[0fr] invisible'
        }`}
      >
        <div className="overflow-hidden">
          {open && (
            <CardForm
              initialWeight={savedWeight}
              initialFasting={savedFasting}
              onSave={handleSave}
              onCancel={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
