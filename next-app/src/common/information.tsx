import { twMerge } from 'tailwind-merge';
import type { Maybe } from './custom-types';

type PriceProps = {
  className?: string;
  value: Maybe<string>;
};

export function Information({ className, value }: PriceProps) {
  return <span className={twMerge('font-bold', className)}>{value}</span>;
}
