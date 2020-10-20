import {useContext} from 'react';
import DictionaryContext from '../context/dictionaryContext';

export default () => {
  const {dictionary} = useContext(DictionaryContext);

  const flattenDic = dictionary?.reduce((prev, curr) => {
    const key = Object.keys(curr)[0];
    const data = curr[key].reduce(
      (p, c) => ({
        ...p,
        ...c,
      }),
      {},
    );

    return {
      ...prev,
      [key]: data,
    };
  }, {});

  return flattenDic;
};
