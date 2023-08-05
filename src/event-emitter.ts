// TODO: implement more features & tests
// - return off() function
// - https://github.com/alialparslan/alpeventemitter/blob/master/index.js
// - add once() method
export default class EventEmitter {
  callbacks: Record<string, ((node: any) => void)[]>;
  constructor() {
    this.callbacks = {};
  }

  on(event: string, cb: (...args: any) => void) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(cb);
  }

  emit(event: string, ...args: any) {
    const cbs = this.callbacks[event];
    if (cbs) {
      // cbs.forEach((cb) => cb(...args));
      cbs.forEach((cb) => cb.apply(null, args));
    }
  }
}
