import { Dual } from "@/core/derivatives/dual";
import { model } from "@/core/model";
import { rungeKutta } from "@/core/simulation/runge-kutta";

export const simulate = (control: number[]) => {
  const numRKSteps = 10;
  const dim = control.length;
  const u = control.map((ui, i) => Dual.variable(ui, dim, i));
  let x = [Dual.constant(1, dim), Dual.constant(0, dim)];
  const output = [
    { t: 0, x1: x[0].value, x2: x[1].value, x3: 1 - x[0].value - x[1].value },
  ];
  for (let i = 0; i < dim; i++) {
    const uk = u[i];

    const dynamics = model(uk);
    const step = rungeKutta(dynamics, 1 / dim / numRKSteps);
    for (let j = 0; j < numRKSteps; j++) {
      x = step(x);
    }

    output.push({
      t: ((i + 1) * 1) / dim,
      x1: x[0].value,
      x2: x[1].value,
      x3: 1 - x[0].value - x[1].value,
    });
  }

  return output;
};
