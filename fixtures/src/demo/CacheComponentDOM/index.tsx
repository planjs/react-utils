import React from 'react';
import { incrementId } from '@planjs/utils';

import { CacheComponentDOM, useBoolean, useCounter, useInterval } from '../../../../';

const id = incrementId();

function Counter() {
  const key = id();
  return <div>{key}</div>;
}

const CacheComponentDOMDemo: React.FC = () => {
  const [visible, setVisible] = useBoolean(true);

  const [count, { inc }] = useCounter(0);

  useInterval(() => inc(1), 1000, true);

  return (
    <div>
      <h1>CacheComponentDOM</h1>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {!visible ? '显示' : '移除'}
      </button>
      <div>update {count}</div>
      {visible ? (
        <CacheComponentDOM
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
          shouldUpdate={() => false}
        >
          <Counter />
          <iframe
            src="https://www.aquanliang.com/admin"
            title="web"
            style={{ width: '100vw', height: 400 }}
          />
        </CacheComponentDOM>
      ) : null}
    </div>
  );
};

export default CacheComponentDOMDemo;
