const MAX_COUNT = 16;
const exported: Set<number> = new Set();

export default class AvatarFactory {
  static build() {
    while (true) {
      const id = (Math.floor(Math.random() * (MAX_COUNT - 1))) + 1;
      if (exported.has(id)) {
        continue;
      }

      exported.add(id);
      return `image/avatar/${id.toString().padStart(2, "0")}.jpg`;
    }

  }
}

