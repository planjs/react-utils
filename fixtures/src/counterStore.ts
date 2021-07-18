import { action, observable, reaction } from 'mobx';
import { persist, create } from '../../../';

const hydrate = create();

class CounterStore {
  @persist @observable count = 0;
  @persist('list') @observable trace: number[] = [];

  @action add = () => {
    this.count++;
  };

  @action sub = () => {
    this.count--;
  };

  @action record = () => {
    this.trace.push(this.count)
  }
}

const counterStore = new CounterStore();

const persistCounterStore = hydrate('@planjs/persist', counterStore);

persistCounterStore.then((store) => {
  console.log('persist count', store.count);
  reaction(
    () => counterStore.count,
    () => {
      counterStore.record()
    },
  );
});

export { persistCounterStore };
export default counterStore;
