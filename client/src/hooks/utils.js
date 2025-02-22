// function numRange(from, to) {
//   const result = [];

//   for (let i = from; i <= to; i++) {
//     result.push(i);
//   }

//   return result;
// }

// function findWeek(zts) {
//   const date = new Date(zts);
//   date.setUTCDate(date.getUTCDate() - date.getUTCDay());
//   date.setUTCHours(0, 0, 0, 0);

//   return date.toISOString();
// }

// const dayIndex = (zts) => new Date(zts).getUTCDay();

// function commitsMap(startTime, endTime) {
//   const map = new Map();
//   let reference = new Date(findWeek(startTime));
//   let endDate = new Date(endTime).getTime();

//   while (reference.getTime() < endDate) {
//     map.set(reference.toISOString(), {
//       week: reference.toISOString(),
//       total: 0,
//       days: new Array(7).fill(0),
//     });

//     reference.setUTCDate(reference.getUTCDate() + 7);
//   }

//   return map;
// }

// function quarts(daysArr) {
//   let arr = daysArr.flat().toSorted((a, b) => a - b);
//   let modArr = arr.slice(arr.findIndex((n) => n !== 0));
//   let bounds = numRange(1, 4).map((num) => (num * (modArr.length + 1)) / 4);

//   return bounds
//     .map((bound, i) => i !== 3 && modArr[Math.floor(bound) - 1])
//     .slice(0, 3);
// }

// function weekShade(value, quart) {
//   quart.sort((a, b) => a - b);
//   if (value === 0) return value;
//   if (value <= quart[0]) return 1;
//   if (value <= quart[1]) return 2;
//   if (value <= quart[2]) return 3;
//   return 4;
// }

// export {
//   dateRange,
//   findWeek,
//   dayIndex,
//   numRange,
//   commitsMap,
//   quarts,
//   weekShade,
// };

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
  startPoint.setUTCFullYear(getYear(period) - 1);

  return {
    start: startPoint.toISOString(),
    end: reference.toISOString(),
  };
}

function generateYrsArr(createdYear, currentYear, maxNumYears = 3) {
  if (createdYear > currentYear)
    throw new RangeError('Starting year cannot be greater than current year');

  const minYear = Math.max(createdYear, currentYear - maxNumYears + 1);

  return Array.from(
    { length: currentYear - minYear + 1 },
    (_, i) => minYear + i
  ).reverse();
}

function getYear(dateId) {
  const date = new Date(dateId);
  return date.getUTCFullYear();
}

export { generateYrsArr, getYear, getDateRange };
