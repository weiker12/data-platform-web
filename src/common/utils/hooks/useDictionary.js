import {useContext} from 'react';
import DictionaryContext from 'utils/context/dictionaryContext';

export default keys => {
  const {dictionary} = useContext(DictionaryContext);

  return keys.map(u => {
    const tableInfo = dictionary?.find(v => v[u.table]);

    if (!tableInfo) {
      return null;
    }

    const fieldInfo = tableInfo[u.table].find(v => v[u.field]);

    if (!fieldInfo) {
      return null;
    }

    return fieldInfo[u.field];
  });
};
