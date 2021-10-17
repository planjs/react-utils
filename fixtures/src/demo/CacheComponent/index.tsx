import React from 'react';
import { incrementId } from '@planjs/utils';

import { CacheComponent, useBoolean } from '../../../../';

const id = incrementId();

function Counter() {
  const key = id();
  return <div>{key}</div>;
}

const CacheComponentDemo: React.FC = () => {
  const [visible, setVisible] = useBoolean(true);

  return (
    <div>
      <h1>CacheComponent</h1>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {!visible ? '显示' : '移除'}
      </button>
      {visible ? (
        <CacheComponent
          getContainer={() => {
            const div = document.getElementById('counter');
            if (div) {
              return div;
            }
            const el = document.createElement('div');
            el.id = 'counter';
            el.style.display = 'none';
            document.body.appendChild(el);
            return el;
          }}
        >
          <Counter />
        </CacheComponent>
      ) : null}
    </div>
  );
};

export default CacheComponentDemo;
