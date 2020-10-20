import {useEffect, useState} from 'react';
import useUnmounted from './useUnmounted';
import {message} from 'antd';

export default (query, api, deps = [], process) => {
  const [data, setData] = useState();
  const isUnmounted = useUnmounted();

  useEffect(() => {
    api(query).then(response => {
      if (!isUnmounted) {
        setData(process ? process(response.data) : response.data);
        if (!response.success && response.globalError) {
          message.error(response.globalError);
        }
      }
    });
  }, [query, ...deps]);

  return data;
};
