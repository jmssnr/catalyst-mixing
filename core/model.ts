import { Dual } from "@/core/derivatives/dual";

export const model = (u: Dual) => {
  return (x: Dual[]) => {
    const x1 = x[0];
    const x2 = x[1];
    const dim = u.derivative.length;
    const k = Dual.constant(10, dim);

    return [
      k.multiply(x2).subtract(x1).multiply(u),
      x1
        .subtract(x2.multiply(k))
        .multiply(u)
        .subtract(x2.multiply(Dual.constant(1, dim).subtract(u))),
    ];
  };
};
