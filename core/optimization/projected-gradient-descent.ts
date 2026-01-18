import { Dual } from "@/core/derivatives/dual";
import { add } from "@/core/derivatives/utils";

export function* projectedGradientDescent(
  fun: (x: Dual[]) => Dual,
  x0: Dual[],
  lb: number[],
  ub: number[],
) {
  const projection = (a: Dual[]) => {
    return a.map(
      (ai, i) =>
        new Dual(Math.min(ub[i], Math.max(lb[i], ai.value)), ai.derivative),
    );
  };

  const normalize = (a: number[]) => {
    const den = Math.hypot(...a);
    return a.map((ai) => ai / den);
  };

  let x = projection(x0);

  for (let i = 0; i < 500; i++) {
    const fx = fun(x);
    const grad = fx.derivative;

    yield x.map((xi) => xi.value);

    const direction = normalize(grad).map((d) => -1 * d);

    const alpha = 10 * 0.9 ** (i - 1);

    const step = direction.map((d) => Dual.constant(alpha * d, x.length));

    x = projection(add(x, step));

    if (Math.abs(fx.value - fun(x).value) <= 1e-8) {
      return x.map((xi) => xi.value);
    }
  }

  return x.map((xi) => xi.value);
}
