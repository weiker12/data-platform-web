import {useRef, useEffect} from 'react';

export default () => {
  const unmounted = useRef(false);
  // eslint-disable-next-line no-return-assign
  useEffect(() => () => (unmounted.current = true), []);
  return unmounted.current;
};
