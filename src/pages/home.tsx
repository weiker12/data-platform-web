import React from 'react';
import {useReducer, useContext} from 'react';
import store from '@/store';
import GlobalContext from '@/common/utils/context/globalContext';
import {Spin} from 'antd';
export interface IProps {
  children: React.ReactNode;
}

export default (props: IProps) => {
  // console.log('homeProps', props);
  const {defaultState, reducer} = store;
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Spin size="large" spinning={state.globalLoading}>
      <GlobalContext.Provider value={{state, dispatch}}>
        {props.children}
      </GlobalContext.Provider>
    </Spin>
  );
};
