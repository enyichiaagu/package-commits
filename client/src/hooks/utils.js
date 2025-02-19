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

// function dateRange(year) {
//   if (Number(year) && year !== 'current') {
//     return {
//       startTime: `${year}-01-01T00:00:00.000Z`,
//       endTime: `${year}-12-31T23:59:59.999Z`,
//     };
//   }

//   let reference = new Date();
//   let start = new Date(reference.getTime());
//   start.setUTCFullYear(reference.getUTCFullYear() - 1);

//   return {
//     startTime: start.toISOString(),
//     endTime: reference.toISOString(),
//   };
// }

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

function generateYrsArr(year, currentYear) {
  const yrs = [];
  do {
    yrs.push(year);
    year++;
  } while (currentYear >= year);

  return yrs.reverse();
}

export { generateYrsArr };
