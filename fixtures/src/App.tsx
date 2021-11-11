import React from 'react';

import MakeGlobalApiDemo from './demo/makeGlobalApi';
import CacheComponentDOMDemo from './demo/CacheComponentDOM';
import SwitchDemo from './demo/Switch';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <MakeGlobalApiDemo />
      <CacheComponentDOMDemo />
      <SwitchDemo />
    </div>
  );
};

export default App;
