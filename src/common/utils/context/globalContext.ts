import React from 'react';

interface IContext {
  state: any;
  dispatch: (args: any) => void;
}

export default React.createContext<IContext>({state: {}, dispatch: () => {}});
