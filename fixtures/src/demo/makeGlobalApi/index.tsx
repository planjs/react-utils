import React from 'react';
import { incrementId } from '@planjs/utils';

import { makeGlobalApi, useCreation } from '../../../../';
import type { MakeGlobalApiReturnType } from '../../../../';

const id = incrementId();

const GlobalApi: React.FC = () => {
  const key = useCreation(id, []);
  return <div>{key}</div>;
};

const globalApi = makeGlobalApi({ children: GlobalApi });

const MakeGlobalApiDemo: React.FC = () => {
  const [returns, setReturns] = React.useState<ReturnType<MakeGlobalApiReturnType['render']>[]>([]);

  return (
    <div>
      <h1>MakeGlobalApi</h1>
      <button
        onClick={() => {
          setReturns([...returns, globalApi.render()]);
        }}
      >
        show
      </button>
      <button
        onClick={() => {
          const item = returns.pop();
          if (item) {
            item.unmount();
            setReturns(returns.slice());
          }
        }}
      >
        del
      </button>
      <button
        onClick={() => {
          setReturns([...returns, globalApi.render({ key: 'once' })]);
        }}
      >
        render once
      </button>
    </div>
  );
};

export default MakeGlobalApiDemo;
