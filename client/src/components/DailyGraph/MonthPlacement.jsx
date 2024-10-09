const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function MonthPlacement({ xPosition, yPosition, monthIndex }) {
  return (
    <g>
      <text
        x={xPosition}
        y={yPosition}
        fontFamily='Consolas, sans serif'
        fontSize='0.8rem'
        dominantBaseline='hanging'
      >
        {months[monthIndex]}
      </text>
    </g>
  );
}

export default MonthPlacement;
