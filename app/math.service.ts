

export class MathService {

  public add(first, second): number {
    return first + second;
  }

  public subtract(first, second): number {
    return first - second;
  }
}

export const mathService = new MathService();