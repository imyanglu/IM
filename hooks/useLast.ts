import { useRef } from 'react';

export function useLast<T>(fun: T) {
  const ref = useRef(fun);
  ref.current = fun;
  return ref;
}
