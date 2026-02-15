import './Card.css';
import { WeightBadge } from '@components/WeightBadge/WeightBadge';
import type { FastingType } from 'src/types/types';
import { FastingBadge } from '@components/FastingBadge/FastingBadge';
import { toHijri } from '@misque/hijri';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useRef } from 'react';
import { BiBadgeCheck, BiErrorAlt } from 'react-icons/bi';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { useClickOutside } from '../../hooks/useClickOutside';

type Props = {
  day: Date;
  weight?: number;
  fasting?: FastingType;
};

export function Card({ day, weight, fasting = 'unknown' }: Props) {
  const [open, setOpen] = useState(false);
  const [savedWeight, setSavedWeight] = useState(weight || 75.0);
  const [savedFasting, setSavedFasting] = useState<FastingType>(fasting);

  const [localWeight, setLocalWeight] = useState(savedWeight);
  const [localFasting, setLocalFasting] = useState<FastingType>(savedFasting);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setLocalWeight(savedWeight);
    setLocalFasting(savedFasting);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useClickOutside(cardRef, handleClose);

  const hijriResult = toHijri(day);

  const ramadanDay = hijriResult.success ? hijriResult.data.day : '';

  const localDate = day.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleIncrement = () => {
    setLocalWeight(prev => Number((prev + 0.1).toFixed(1)));
  };

  const handleDecrement = () => {
    setLocalWeight(prev => Number((prev - 0.1).toFixed(1)));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLocalWeight(value);
    }
  };

  const handleSave = () => {
    console.log('Saving:', { localWeight, localFasting });
    setSavedWeight(localWeight);
    setSavedFasting(localFasting);
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
        onClick={() => (open ? handleClose() : handleOpen())}
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
        <form action={handleSave} className="overflow-hidden">
          <div className="flex gap-2 px-4 pb-4 pt-0">
            <label
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all ${
                localFasting === 'fasting'
                  ? 'bg-green-100 text-green-800 border-green-500 shadow-inner'
                  : 'bg-green-100 text-green-800 border-transparent hover:bg-green-100'
              }`}
            >
              <input
                type="radio"
                name="fasting"
                className="hidden"
                value="fasting"
                checked={localFasting === 'fasting'}
                onChange={() => setLocalFasting('fasting')}
              />
              Jeûné <BiBadgeCheck className="size-5 text-green-800" />
            </label>

            <label
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all ${
                localFasting === 'not-fasting'
                  ? 'bg-orange-100 text-orange-800 border-orange-500 shadow-inner'
                  : 'bg-orange-50 text-orange-800 border-transparent hover:bg-orange-100'
              }`}
            >
              <input
                type="radio"
                name="fasting"
                className="hidden"
                value="not-fasting"
                checked={localFasting === 'not-fasting'}
                onChange={() => setLocalFasting('not-fasting')}
              />
              Non Jeûné
              <BiErrorAlt className="size-5 text-orange-800" />
            </label>
          </div>

          <div className="px-4 pb-4">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Poids enregistré
            </label>
            <div className="bg-slate-50/50 rounded-2xl p-2 flex items-center justify-between border border-slate-100">
              <button
                type="button"
                onClick={handleDecrement}
                className="size-9 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all hover:border-slate-300"
              >
                <HiMinus className="size-4" />
              </button>

              <div className="flex items-baseline gap-0.5">
                <input
                  type="number"
                  step="0.1"
                  className="w-16 bg-transparent text-center text-2xl font-black text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={localWeight}
                  onChange={handleWeightChange}
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase">kgs</span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                className="size-9 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all hover:border-slate-300"
              >
                <HiPlus className="size-4" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-4 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 active:scale-[0.98] transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-2 py-3 bg-emerald-700 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 active:scale-[0.98] transition-all shadow-md"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
