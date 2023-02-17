interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getStack: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  clear = () => {
    this.container = []
  }

  getStack = () => {
    return this.container;
  }

  getSize = () => {
    return this.container.length;
  }
}
