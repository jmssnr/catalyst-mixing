import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";

const ConcentrationProfile = (props: {
  width: number;
  height: number;
  states: {
    t: number;
    x1: number;
    x2: number;
    x3: number;
  }[];
}) => {
  const { width, height, states } = props;

  const xScale = scaleLinear().range([0, width]).domain([0, 1]);
  const yScale = scaleLinear().range([height, 0]).domain([0, 0.1]);

  const linePath = line<[number, number]>()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const areaPath = area<[number, number]>()
    .x((d) => xScale(d[0]))
    .y0((d) => yScale(0))
    .y1((d) => yScale(d[1]));

  return (
    <svg width={width} height={height} className="overflow-visible">
      <g className="transition-all">
        <path
          d={linePath(states.map((s) => [s.t, s.x3])) ?? ""}
          className={"fill-none stroke-green-500 stroke-2"}
          strokeLinecap="round"
          strokeMiterlimit={5}
          strokeLinejoin="round"
        />
        <path
          d={areaPath(states.map((s) => [s.t, s.x3])) ?? ""}
          className={" fill-green-100 "}
        />
        <circle
          cx={xScale(1)}
          cy={yScale(states.at(-1)?.x3 ?? 0)}
          r={5}
          className="fill-green-300 stroke-green-500"
        />
      </g>
    </svg>
  );
};

export default ConcentrationProfile;
