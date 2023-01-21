interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  // getSize: () => number;
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
}
