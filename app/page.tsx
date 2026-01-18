"use client";

import CatalystProfile from "@/components/catalyst-profile";
import ConcentrationProfile from "@/components/concentration-profile";
import FixedBedReactor from "@/components/fixed-bed-reactor";
import { Dual } from "@/core/derivatives/dual";
import { optimize } from "@/core/optimization/optimize";
import { simulate } from "@/core/simulation/simulate";
import { useAnimate } from "@/hooks/useAnimate";

export default function Home() {
  const numIntervals = 20;

  const { iterations } = useAnimate(
    optimize,
    Array(numIntervals)
      .fill(0)
      .map((ui, i) => Dual.variable(ui, numIntervals, i)),
    Array(numIntervals)
      .fill(0.5)
      .map(() => 0),
    Array(numIntervals)
      .fill(0.5)
      .map(() => 1),
    400,
  );

  const states = simulate(iterations.at(-1) ?? []);

  return (
    <main className="w-screen h-screen grid place-content-center">
      <CatalystProfile
        width={400}
        height={200}
        control={iterations.at(-1) ?? []}
        manualControlUpdate={() => {}}
      />
      <FixedBedReactor
        width={400}
        height={100}
        controls={iterations.at(-1) ?? []}
      />
      <ConcentrationProfile width={400} height={100} states={states} />
    </main>
  );
}
