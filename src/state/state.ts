
// type

export type listener<T> = (items: T[]) => void;


export class State<T> {
    protected listeners: listener<T>[] = [];
    addListeners(callback: listener<T>) {
      this.listeners.push(callback);
    }
  }
