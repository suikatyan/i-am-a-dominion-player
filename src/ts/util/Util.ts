export default class Util {
  static shuffle(array: any[]) : void {
    for(var i = array.length - 1; i > 0; i--){
      const r = Math.floor(Math.random() * (i + 1));
      [array[i], array[r]] = [array[r], array[i]];
    }
  }

  static convertToUpperCamel(text: string) : string {
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  }

  static getUrlParameters(targetKey?: string) : string | undefined | {} {
    const parameters = {} as {[index: string]: string};

    if (location.search !== "") {
      for (const parameter of location.search.substring(1).split("&")) {
        const [key, value] = parameter.split("=");
        parameters[key] = value;
      }
    }

    return targetKey === void 0 ? parameters : parameters[targetKey];
  }
}
