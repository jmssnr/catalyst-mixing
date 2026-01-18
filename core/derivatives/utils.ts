import { Dual } from "@/core/derivatives/dual";

export function add(a: Dual[], b: Dual[]) {
  return a.map((ai, i) => ai.add(b[i]));
}

export function subtract(a: Dual[], b: Dual[]) {
  return a.map((ai, i) => ai.subtract(b[i]));
}

export function scale(a: Dual[], scaler: number) {
  const s = Dual.constant(scaler, a[0].derivative.length);
  return a.map((ai) => ai.multiply(s));
}
