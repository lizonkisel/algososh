export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
  
interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    insertByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    getSize: () => number;
    print: () => void;
    getArray: () => T[];
}
  
export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
  
    append(element: T) {
      const node = new Node(element);
      if (this.head === null || this.tail === null) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }
      
      this.size++;
    }

    prepend(element: T) {
        const node = new Node(element, this.head);
        this.head = node;
        if (this.head === null || this.tail === null) {
            this.tail = node;
        }      
        this.size++;
    }

    deleteHead() {
        if (!this.head) {
            throw new Error("No elements in the list");
        }
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.size--;
    };

    deleteTail() {
        if (!this.tail) {
            throw new Error("No elements in the list");
        }
      
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            let curNode = this.head;
            while (curNode !== null && curNode.next) {
                if (curNode.next.next) {
                    curNode = curNode.next;
                } else {
                    curNode.next = null;
                }
            }
            this.tail = curNode;
        }
        this.size--;
    };

    insertByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {  
            if (index === 0) {
                this.prepend(element)
            } else {
                const node = new Node(element);

                let curr = this.head;
                let currIndex = 0;
        
                while (currIndex < index && curr) {
                    if (currIndex === index - 1) {
                        node.next = curr.next;
                        curr.next = node;
                    }
                    curr = curr.next;
                    currIndex++;
                };        
                this.size++;
            }
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index >= this.size) {
            console.log('Enter a valid index');
            return;
        }
        if (index === 0) {
            this.deleteHead();
        } else if (index === this.size - 1) {
            this.deleteTail();
        } else {
            let curr = this.head;
            let currIndex = 0;
    
            while (currIndex < index && curr && curr.next) {
                if (currIndex === index - 1) {
                    curr.next = curr.next.next;
                }
                curr = curr.next;
                currIndex++;
            };
            this.size--; 
        }
    };
  
    getSize() {
      return this.size;
    };
  
    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
    }

    getArray() {
        let curr = this.head;
        let res = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
      }
  }