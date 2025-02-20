export const xStart = 0,
  daysWidth = 35,
  squareLength = 13,
  padding = 3,
  radius = 4,
  topSpace = 10,
  bottomSpace = 20,
  barLeftPadding = 15,
  barWidth = 55,
  defaultTotalWeeks = 54,
  defaultColors = ['#eaeaea', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  // Set height of the component once
  GRAPH_HEIGHT =
    (squareLength + padding) * daysArray.length + bottomSpace + topSpace,
  GRAPH_WIDTH =
    daysWidth + (squareLength + padding) * defaultTotalWeeks - padding,
  MONTHS = [
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
