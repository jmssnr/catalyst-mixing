import { Dual } from "@/core/derivatives/dual";
import { model } from "@/core/model";
import { rungeKutta } from "@/core/simulation/runge-kutta";

export const optimize = (control: Dual[]) => {
  const numRKSteps = 1;
  const dim = control.length;
  let x = [Dual.constant(1, dim), Dual.constant(0, dim)];
  for (let i = 0; i < dim; i++) {
    const uk = control[i];

    const dynamics = model(uk);
    const step = rungeKutta(dynamics, 1 / dim / numRKSteps);
    for (let j = 0; j < numRKSteps; j++) {
      x = step(x);
    }
  }

  return Dual.constant(1, dim).subtract(x[0]).subtract(x[1]).negate();
};
