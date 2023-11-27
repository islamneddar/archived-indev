export class StringUtils {
  private static _instance = new StringUtils();

  public static getInstance(): StringUtils {
    return this._instance;
  }

  getFirstLetterAlphanumericInAString(str: string): string | undefined {
    const regex = /[a-zA-Z0-9]/;
    const found = str.match(regex);
    return found ? found[0] : undefined;
  }
}
