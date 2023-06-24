import { useEffect } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (!delay) {
      return;
    }
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, []);
};

export default useInterval;
