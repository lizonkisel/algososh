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
    getSize: () => number;
    print: () => void;
}
  
export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    private list: any;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.list = new Node(0);
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
      console.log(node);
      
      this.size++;
    }

    prepend(element: T) {
        const node = new Node(element, this.head);
      if (this.head === null || this.tail === null) {
        this.head = node;
        this.tail = node;
      } else {
        this.head = node;
        // this.tail.next = node;
        // this.tail = node;
      }
      console.log(node);
      
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
  
    getSize() {
      return this.size;
    }

    // addToList() {

    // }

    // getList() {

    //     let dummyHead = new Node(0); // добавим в начало пустой узел
    //     //@ts-ignore
    //     dummyHead.next = this.head;
    //     let curr = dummyHead;
               
    //     let prev;
        
    //     while (curr && curr.next) {

    //     //   prev = curr;
    //     //   curr = curr.next;
    //     //   while (curr.value === val) {
    //     //     if (curr.next) {
    //     //       prev.next = curr.next;
    //     //       curr = curr.next;
    //     //       console.log('Here');
    //     //     } else {
    //     //       console.log('azaza');
    //     //       curr = prev;
    //     //       curr.next = null;
    //     //     }
    //     //   } 
    //     //   console.log(prev);
    //     //   console.log(curr);
    //     }
    //     console.log(dummyHead.next);
        
    //     return dummyHead.next; 
    // }
  
    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
      console.log(res);
    }

    getArray() {
        let curr = this.head;
        let res = [];
        while (curr) {
        //   res += `${curr.value} `;
            res.push(curr.value);
            curr = curr.next;
        }
        console.log(res);
        return res;
      }
  }
  
//   const list = new LinkedList<number>();
//   list.append(12);
//   list.append(13);
//   list.append(14);
//   list.print(); //4 12 13 1