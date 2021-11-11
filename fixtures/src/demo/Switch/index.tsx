import React from 'react';

import { Switch } from '../../../../';

const SwitchDemo = () => {
  const [val, setVal] = React.useState(0);
  return (
    <div>
      <div>
        value: {val}
        <button
          onClick={() => {
            setVal(val === 1 ? 0 : 1);
          }}
        >
          {val === 1 ? 'show default' : 'show condition 1'}
        </button>
      </div>
      <Switch value={val}>
        <Switch.Case condition={1}>condition 1</Switch.Case>
        <Switch.Default>default</Switch.Default>
      </Switch>
    </div>
  );
};

export default SwitchDemo;
