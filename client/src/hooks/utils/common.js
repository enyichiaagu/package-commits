function getYear(dateId) {
  const date = new Date(dateId);
  return date.getUTCFullYear();
}

function getDateRange(period = Date.now()) {
  // Check if period is a year
  if (Number(period) && period.toString().length === 4) {
    return {
      start: `${period}-01-01T00:00:00.000Z`,
      end: `${period}-12-31T23:59:59.999Z`,
    };
  }

  let reference = new Date(period);
  let startPoint = new Date(period);
  startPoint.setFullYear(getYear(period) - 1);

  return {
    start: startPoint.toISOString(),
    end: reference.toISOString(),
  };
}

function generateYrsArr(createdYear, currentYear, maxNumYears = 3) {
  if (createdYear > currentYear)
    throw new RangeError('Starting year cannot be greater than current year');

  // const minYear = Math.max(createdYear, currentYear - maxNumYears + 1);
  const minYear = createdYear;

  return Array.from(
    { length: currentYear - minYear + 1 },
    (_value, index) => minYear + index
  ).reverse();
}

export { generateYrsArr, getYear, getDateRange };
