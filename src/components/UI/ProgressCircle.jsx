const cleanPercentage = (percentage) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };
  
  const Circle = ({ color, percentage }) => {
    const r = 80;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100;
    return (
      <circle
        r={r}
        cx={100}
        cy={100}
        fill="transparent"
        stroke={strokePct !== circ ? color : "#fff"} 
        strokeWidth={"1rem"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
      ></circle>
    );
  };
  
  const Text = ({ percentage, textColor, textCircle }) => {
    return (
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={"1.5rem"}
        color={textColor}
        fontWeight={'700'}
        fontFamily={"Couture"}
      >
        {textCircle}
        <br/>
        {percentage.toFixed(0)}%
      </text>
    );
  };
  
  export const ProgressCircle = ({ percentage, color, textColor, textCircle }) => {
    const pct = cleanPercentage(percentage);
    return (
      <svg width={200} height={200}>
        <g transform={`rotate(-90 ${"100 100"})`}>
          <Circle color="#fff" />
          <Circle color={color} percentage={pct} />
        </g>
        <Text percentage={pct} textColor={textColor} textCircle={textCircle} />
      </svg>
    );
  };  