import React from "react";
import { observer } from "mobx-react";
import counterStore from "./counterStore";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>count: {counterStore.count}</h1>
      <button onClick={counterStore.add}>+</button>
      <button onClick={counterStore.sub}>-</button>
    </div>
  );
};

export default observer(App);
