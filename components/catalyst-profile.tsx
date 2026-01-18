"use client";

import { scaleLinear } from "d3-scale";
import { useState } from "react";

const CatalystProfile = (props: {
  width: number;
  height: number;
  control: number[];
  manualControlUpdate: (c: number[]) => void;
}) => {
  const { width, height, control, manualControlUpdate } = props;
  const [active, setActive] = useState<number | null>(null);
  const numIntervals = control.length;

  const xScale = scaleLinear().range([0, width]).domain([0, 1]);
  const yScale = scaleLinear().range([height, 0]).domain([-0.5, 1.5]);

  return (
    <svg
      style={{ userSelect: "none" }}
      width={width}
      height={height}
      className="overflow-visible"
      onPointerMove={(event) => {
        if (active === null) return;

        const { top } = event.currentTarget.getBoundingClientRect();

        const nextU = Math.min(
          1,
          Math.max(0, yScale.invert(event.clientY - top)),
        );

        const nextControl = control.map((u, i) => (i === active ? nextU : u));

        manualControlUpdate(nextControl);
      }}
    >
      <clipPath id="clippy">
        <rect x={0} y={0} width={width} height={yScale(0)} />
      </clipPath>

      <text
        className="fill-violet-600 font-bold"
        x={width / 2}
        y={yScale(1.2)}
        textAnchor="middle"
      >
        Fraction of Catalyst A
      </text>
      <text
        dx={-20}
        x={0}
        y={yScale(1)}
        dominantBaseline="central"
        className="fill-gray-600"
      >
        1.0
      </text>
      <text
        dx={-20}
        x={0}
        y={yScale(0)}
        dominantBaseline="central"
        className="fill-gray-600"
      >
        0.0
      </text>
      <line
        x1={0}
        x2={width}
        y1={yScale(0)}
        y2={yScale(0)}
        className="stroke-gray-200"
      />
      <line
        x1={0}
        x2={width}
        y1={yScale(1)}
        y2={yScale(1)}
        className="stroke-gray-200"
      />

      {control.map((u, index) => (
        <g key={`control-${index}`}>
          <rect
            clipPath="url(#clippy)"
            x={xScale(index / numIntervals)}
            y={yScale(u)}
            width={width / numIntervals}
            height={height - yScale(u)}
            className="fill-violet-100 transition-none stroke-white group-active:fill-violet-200 transition-colors"
          />

          <g
            className="group transition-all"
            transform={`translate(0, ${yScale(u)})`}
          >
            <line
              x1={xScale(index / numIntervals)}
              x2={xScale(((index + 1) * 1) / numIntervals)}
              y1={0}
              y2={0}
              className="stroke-violet-500 stroke-3 group-active:fill-violet-900 transition-all ease-out"
            />
            <line
              x1={xScale(index / numIntervals)}
              x2={xScale(((index + 1) * 1) / numIntervals)}
              y1={yScale(u)}
              y2={yScale(u)}
              className=" stroke-transparent  stroke-10"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setActive(index);
              }}
              onPointerUp={(event) => {
                event.currentTarget.releasePointerCapture(event.pointerId);
                setActive(null);
              }}
            />
          </g>
        </g>
      ))}
    </svg>
  );
};

export default CatalystProfile;
