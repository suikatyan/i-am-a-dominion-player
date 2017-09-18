export default class Dice {
  static shoot(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static select(target: any[]) {
    return target[this.shoot(0, target.length - 1)];
  }

  static selectEnum<T>(target: any) : T {
    return this.select(Object.entries(target))[0];
  }

  static win(percentage = 50) {
    return this.shoot(1, 100) <= percentage;
  }
}
