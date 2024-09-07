import { useState, useCallback } from "react";

function useDebounce<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  const debounce = useCallback(
    (fn: (...args: any[]) => void) => {
      let timer: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    },
    [delay],
  );

  const debouncedSetValue = useCallback(
    debounce((newValue: T) => setDebouncedValue(newValue)),
    [debounce],
  );

  const setValueAndDebounce = useCallback(
    (newValue: T) => {
      setValue(newValue);
      debouncedSetValue(newValue);
    },
    [debouncedSetValue],
  );

  return [value, debouncedValue, setValueAndDebounce] as const;
}

export default useDebounce;
