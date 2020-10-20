import {useState} from 'react';

export default (init = true) => {
  const [flag, setFlag] = useState(init);
  const changeFlag = value =>
    value === true || value === false ? setFlag(value) : setFlag(!flag);
  return [flag, changeFlag];
};
