interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getQueue: () => (T | null)[];
    getQueueLength: () => number;
    getHeadIndex: () => number;
    getTailIndex: () => number;
    getSize: () => number;
    clear: () => void;
}
  
export class Queue<T> implements IQueue<T> {
    private container: (T)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size || this.head === this.size) {
            throw new Error("Maximum length exceeded");
        } else {
            this.container[this.tail % this.size] = item;
            this.tail++;
            this.length++;
        }
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
    };

    isEmpty = () => this.length === 0;

    getQueue = () => {
        return this.container;
    }

    getQueueLength = () => {
        return this.container.length;
    }

    getHeadIndex = () => {
        return this.head;
    };

    getTailIndex = () => {
        return this.tail;
    };

    getSize = () => {
        return this.size;
    };

    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
    }
}