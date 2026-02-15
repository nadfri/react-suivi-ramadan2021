import { useState } from 'react';
import { BiBadgeCheck, BiErrorAlt } from 'react-icons/bi';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { WeightTrend } from '@components/WeightBadge/WeightTrend';
import type { FastingType } from 'src/types/types';

type Props = {
  initialWeight: number;
  initialFasting: FastingType;
  onSave: (weight: number, fasting: FastingType) => void;
  onCancel: () => void;
};

export function CardForm({ initialWeight, initialFasting, onSave, onCancel }: Props) {
  const [weight, setWeight] = useState(initialWeight);
  const [fasting, setFasting] = useState<FastingType>(initialFasting);

  const handleIncrement = () => {
    setWeight(prev => Number((prev + 0.1).toFixed(1)));
  };

  const handleDecrement = () => {
    setWeight(prev => Number((prev - 0.1).toFixed(1)));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setWeight(value);
    }
  };

  const handleSubmit = () => {
    onSave(weight, fasting);
  };

  return (
    <form action={handleSubmit} className="overflow-hidden">
      <div className="flex gap-2 px-4 pb-4 pt-0">
        <label
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all ${
            fasting === 'fasting'
              ? 'bg-green-100 text-green-800 border-green-500 shadow-inner'
              : 'bg-green-50 text-green-800 border-transparent hover:bg-green-100'
          }`}
        >
          <input
            type="radio"
            name="fasting"
            className="hidden"
            value="fasting"
            checked={fasting === 'fasting'}
            onChange={() => setFasting('fasting')}
          />
          Jeûné <BiBadgeCheck className="size-5 text-green-800" />
        </label>

        <label
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all ${
            fasting === 'not-fasting'
              ? 'bg-orange-100 text-orange-800 border-orange-500 shadow-inner'
              : 'bg-orange-50 text-orange-800 border-transparent hover:bg-orange-100'
          }`}
        >
          <input
            type="radio"
            name="fasting"
            className="hidden"
            value="not-fasting"
            checked={fasting === 'not-fasting'}
            onChange={() => setFasting('not-fasting')}
          />
          Non Jeûné
          <BiErrorAlt className="size-5 text-orange-800" />
        </label>
      </div>

      <div className="px-4 pb-4">
        <label
          htmlFor="weight-input"
          className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1"
        >
          Poids enregistré
        </label>
        <div className="bg-slate-50/50 rounded-2xl p-2 flex items-center justify-between border border-slate-100">
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Diminuer le poids de 0.1 kg"
            className="size-9 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all hover:border-slate-300"
          >
            <HiMinus className="size-4" />
          </button>

          <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center">
            <div />
            <div className="flex items-baseline gap-1">
              <input
                id="weight-input"
                type="number"
                step="0.1"
                className="w-20 bg-transparent text-center text-3xl font-black text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div className="flex items-center gap-2 pl-1">
              <span className="font-bold text-slate-400 uppercase">kgs</span>
              <WeightTrend current={weight} baseline={initialWeight} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Augmenter le poids de 0.1 kg"
            className="size-9 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all hover:border-slate-300"
          >
            <HiPlus className="size-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
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
  );
}
