import { useCallback, useRef } from 'react';
import { useUncontrolledState } from '../use-uncontrolled-state';

export const useControlledState = <T,>(
  value: T,
  defaultValue: T,
  onChange: (value: T) => void,
): [T, (value: T, ...args: any[]) => void] => {
  const [uncontrolledState, setUncontrolledState] = useUncontrolledState(defaultValue, onChange);
  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolledState;
  const stateRef = useRef(uncontrolledState);

  const onChangeCaller = useCallback((value) => {
    if (!Object.is(stateRef.current, value)) {
      onChange?.(value);
    }
  }, []);

  const setState = useCallback(
    (nextValue) => {
      if (typeof nextValue === 'function') {
        let updateFunctions = (oldValue): any => {
          if (isControlled) {
            onChangeCaller(nextValue(stateRef.current));
            return oldValue;
          }
          return nextValue(oldValue);
        };
        setUncontrolledState(updateFunctions as any);
      } else {
        if (isControlled) {
          onChangeCaller(nextValue);
        } else {
          setUncontrolledState(nextValue);
        }
      }
    },
    [isControlled, onChangeCaller],
  );

  if (isControlled) {
    stateRef.current = value;
  }

  return [state, setState];
};
