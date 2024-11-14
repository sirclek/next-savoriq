import { twMerge } from 'tailwind-merge';
import type { Maybe } from './custom-types';

type SimilarityProps = {
  value: number;
};

function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function getColor(value: number): string {
  if (value < 0.16) return 'text-[#C70A0A]'; // red
  if (value < 0.35) return 'text-[#D1400E]'; // dark red
  if (value < 0.50) return 'text-[#E07D12]'; // yellow
  if (value < 0.70) return 'text-[#E8AA2F]'; // gold
  if (value < 0.90) return 'text-[#487A28]'; // light green
  return 'text-[#1E3316]'; // green
}

export function Similarity({ value }: SimilarityProps) {
  return (
    <span className={twMerge('font-bold', getColor(value))}>
      {formatPercentage(value)} Match
    </span>
  );
}
