export class Dual {
  value: number;
  derivative: number[];

  static variable(value: number, dimension: number, index: number) {
    return new Dual(
      value,
      Array(dimension)
        .fill(0)
        .map((_, i) => (i === index ? 1 : 0)),
    );
  }

  static constant(value: number, dimension: number) {
    return new Dual(value, Array(dimension).fill(0));
  }

  constructor(value: number, derivative: number[]) {
    this.value = value;
    this.derivative = derivative;
  }

  add(other: Dual) {
    return new Dual(
      this.value + other.value,
      this.derivative.map((d, i) => d + other.derivative[i]),
    );
  }

  subtract(other: Dual) {
    return new Dual(
      this.value - other.value,
      this.derivative.map((d, i) => d - other.derivative[i]),
    );
  }

  multiply(other: Dual) {
    return new Dual(
      this.value * other.value,
      this.derivative.map(
        (d, i) => d * other.value + this.value * other.derivative[i],
      ),
    );
  }

  negate() {
    return new Dual(
      -this.value,
      this.derivative.map((d) => -d),
    );
  }
}
