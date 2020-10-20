import {useEffect, useState} from 'react';
import useUnmounted from './useUnmounted';

// TODO: 这个和useResource的差别只是多返回一个setData，后续考虑并成一个。
export default (query, api, deps = [], process) => {
  const [data, setData] = useState();
  const isUnmounted = useUnmounted();

  useEffect(() => {
    api(query).then(response => {
      !isUnmounted && setData(process ? process(response.data) : response.data);
    });
  }, [query, ...deps]);

  return [data, setData];
};
