import {useContext} from 'react';
import GlobalContext from '../context/globalContext';

export default () => {
  const {dispatch} = useContext(GlobalContext);
  return {
    showLoading: () =>
      dispatch({type: 'global', payload: {globalLoading: true}}),
    hideLoading: () =>
      dispatch({type: 'global', payload: {globalLoading: false}}),
  };
};
