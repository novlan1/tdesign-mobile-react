import { useEffect } from 'react';
import useLatest from './use-latest';
import { isFunction } from '../utils';
import { devWarning } from '../utils/dev-log';

const useUnmount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      devWarning('useUnmount', `expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useUnmount;
