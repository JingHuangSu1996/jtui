import { useEffect, useState, useCallback, useRef } from 'react';

export const useUncontrolledState = <T,>(
  defaultValue: T,
  onChange: (value: T, ...args: any) => void,
): [T, (value: T, ...args: any[]) => void] => {
  const uncontrollState = useState<T>(defaultValue);
  const [value] = uncontrollState;
  const previousValueRef = useRef<T>(value);
  const handleChange = useCallback(onChange, []);

  useEffect(() => {
    if (!Object.is(value, previousValueRef.current)) {
      handleChange(value);
      previousValueRef.current = value;
    }
  }, [value]);

  return uncontrollState;
};
