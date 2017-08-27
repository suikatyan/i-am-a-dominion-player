const itemMap: Map<string, any> = new Map();

export default class DI {
  static inject(specifiedName?: string) : Function | never {
    return (target: any, name: string) => {
      const keyName = specifiedName === void 0 ? name : specifiedName;
      target[keyName] = () => itemMap.get(keyName);
    };
  }

  static subscribe(keyName: string, target: any) : void | never {
    itemMap.set(keyName, target);
  }

  static list() {
    return itemMap;
  }
}
