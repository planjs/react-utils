import React from 'react';

import MakeGlobalApiDemo from './demo/makeGlobalApi';
import CacheComponentDemo from './demo/CacheComponent';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <MakeGlobalApiDemo />
      <CacheComponentDemo />
    </div>
  );
};

export default App;
