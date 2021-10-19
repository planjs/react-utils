import React from 'react';

import MakeGlobalApiDemo from './demo/makeGlobalApi';
import CacheComponentDOM from './demo/CacheComponentDOM';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <MakeGlobalApiDemo />
      <CacheComponentDOM />
    </div>
  );
};

export default App;
