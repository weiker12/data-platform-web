import {useEffect, useState} from 'react';
import useUnmounted from './useUnmounted';
import useGlobalLoading from '@/common/utils/hooks/useGlobalLoading';

export default (query, api, params = {global: true}, deps = [], process) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const {showLoading, hideLoading} = useGlobalLoading();
  const isUnmounted = useUnmounted();

  useEffect(() => {
    setLoading(true);
    params.global && showLoading();
    api(query).then(response => {
      if (!isUnmounted) {
        params.global && hideLoading();
        setLoading(false);
        if (!response.success && response.globalError) {
          return message.error(response.globalError);
        }
        setData(process ? process(response.data) : response.data);
      }
    });
  }, [query, ...deps]);

  return [data, setData, loading];
};
