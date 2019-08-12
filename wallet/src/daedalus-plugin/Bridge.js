export default class Bridge {
  constructor() {
    window.addEventListener('message', this.handleMessage.bind(this));

    this.frame = this.createFrame();
    this.id = 1;
    this.callbacks = {};
    this.isReady = false;
    this.queue = [];
  }

  createFrame() {
    const element = document.createElement('iframe');
    element.src = `//daedalus.industries/bridge/index.html`;
    element.style.display = 'none';
    document.body.appendChild(element);
    return element;
  }

  call(method, ...params) {
    return new Promise((resolve, reject) => {
      const id = this.id;
      this.id += 1;

      this.callbacks[id] = {resolve, reject};

      this.post({
        origin: 'embed',
        id,
        method,
        params,
      });
    })
  }

  post(message) {
    if (this.isReady) {
      this.frame.contentWindow.postMessage(message, '*');
    } else {
      this.queue.push(message);
    }
  }

  handleMessage({ data }) {
    if (!data.origin || data.origin !== 'bridge') {
      return;
    }

    if (data.ready) {
      this.ready();
      return;
    }

    if (!data.id || !this.callbacks[data.id]) {
      throw new Error('Invalid message', data);
    }
    const { resolve, reject } = this.callbacks[data.id];

    if (data.error) {
      reject(data.error);
    } else {
      resolve(data.result);
    }
  }

  ready() {
    this.isReady = true;
    const queue = this.queue;
    this.queue = [];
    queue.forEach(message => this.post(message));
  }
}