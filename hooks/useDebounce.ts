import { useRef } from 'react';
import { useLast } from './useLast';

export function useDebounce<T extends (a?: any) => void>(value: T, delay: number) {
  // State and setters for debounced value
  const timer = useRef<NodeJS.Timeout>();
  const funRef = useLast(value);
  const _run = (args?: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      funRef.current?.(args);
    }, delay);
  };
  return _run;
}
