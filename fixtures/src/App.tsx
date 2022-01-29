import React from 'react';

import MakeGlobalApiDemo from './demo/makeGlobalApi';
import CacheComponentDOMDemo from './demo/CacheComponentDOM';
import SwitchDemo from './demo/Switch';
import FormatterWrapDemo from './demo/FormatterWrap';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <MakeGlobalApiDemo />
      <CacheComponentDOMDemo />
      <SwitchDemo />
      <FormatterWrapDemo/>
    </div>
  );
};

export default App;
