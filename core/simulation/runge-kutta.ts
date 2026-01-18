import { Dual } from "@/core/derivatives/dual";
import { add, scale } from "@/core/derivatives/utils";

export function rungeKutta(fun: (x: Dual[]) => Dual[], h: number) {
  return (x: Dual[]) => {
    const k1 = fun(x);
    const k2 = fun(add(x, scale(k1, h / 2)));
    const k3 = fun(add(x, scale(k2, h / 2)));
    const k4 = fun(add(x, scale(k3, h)));
    return add(
      x,
      scale(add(k1, add(scale(k2, 2), add(scale(k3, 2), k4))), h / 6),
    );
  };
}
