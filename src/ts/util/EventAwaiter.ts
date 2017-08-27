interface EventParameters {
  targets: any,
  type: string,
  options?: {
    capture?: boolean,
    once?: boolean,
    passive?: boolean,
  }
}

export default class EventAwaiter {
  static async awaiter(parameters: EventParameters) : Promise<any> {
    const options = Object.assign({
      capture: false,
      once: false,
      passive: false,
    }, parameters.options === void 0 ? {} : parameters.options);

    return new Promise((resolve) => {
      const targets = parameters.targets[Symbol.iterator] === void 0 ? [parameters.targets] : parameters.targets;
      const listener: EventListener = function() {
        for (const target of targets) {
          target.removeEventListener(parameters.type, listener, options);
        }
        resolve(this);
      };

      for (const target of targets) {
        target.addEventListener(parameters.type, listener, options);
      }
    });
  }
}
