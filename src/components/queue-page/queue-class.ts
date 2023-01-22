interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    // peak: () => T | null;
}
  
export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        } else {
            this.container[this.tail % this.size] = item;
            this.tail++;
            this.length++;
        }
        // console.log(this.container);
    };

    dequeue = () => {
        if (this.isEmpty()) {
        throw new Error("No elements in the queue");
        } else {
        const item = this.container[this.head];
        delete this.container[this.head];
        this.head++;
        this.length--;
        }
        console.log(this.container);
    };

    isEmpty = () => this.length === 0;
}