import { Dual } from "@/core/derivatives/dual";
import { projectedGradientDescent } from "@/core/optimization/projected-gradient-descent";
import { useEffect, useRef, useState } from "react";

export const useAnimate = (
  objective: (x: Dual[]) => Dual,
  x0: Dual[],
  lb: number[],
  ub: number[],
  throttle = 100,
) => {
  const [state, setState] = useState<number[][]>([]);
  const optimizer = useRef(projectedGradientDescent(objective, x0, lb, ub));
  const frameIdRef = useRef(0);
  const lastUpdateRef = useRef(0);

  const frame = (time: number) => {
    if (time - lastUpdateRef.current >= throttle) {
      lastUpdateRef.current = time;

      const result = optimizer.current.next();

      setState((prev) => [...prev, result.value]);

      if (!result.done) {
        frameIdRef.current = requestAnimationFrame(frame);
      }
    } else {
      frameIdRef.current = requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, []);

  return { iterations: state };
};
