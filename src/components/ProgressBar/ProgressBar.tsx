import { getMonthLength } from '@misque/hijri';

type Props = {
  currentDay?: number;
  currentHijriYear?: number;
};

export function ProgressBar({ currentDay = 24, currentHijriYear = 1447 }: Props) {
  const monthLength = getMonthLength(currentHijriYear, 9); // Ramadan is the 9th month

  return (
    <div className="flex flex-col items-center space-y-2">
      <span id="progress-label" className="text-xs/2 font-bold">
        Jour {currentDay}/{monthLength}
      </span>
      <div
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuenow={currentDay}
        aria-valuemin={0}
        aria-valuemax={monthLength}
        className="w-1/2 bg-gray-200 rounded-full h-1 overflow-hidden"
      >
        <div
          className="bg-orange-300 h-full"
          style={{ width: `${(currentDay / monthLength) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
