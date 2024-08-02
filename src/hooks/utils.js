function numberRangeArray(from, to) {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
}

function findWeek(zts) {
  const date = new Date(zts);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  date.setUTCHours(0, 0, 0, 0) / 1000;

  return date.toISOString();
}

const dayIndex = (zts) => new Date(zts).getUTCDay();

function dateRange(year) {
  let referenceTime = new Date(),
    startTime,
    endTime;
  if (!year || !Number(year)) {
    endTime = referenceTime.toISOString();
    referenceTime.setUTCFullYear(referenceTime.getUTCFullYear() - 1);
    startTime = referenceTime.toISOString();
  } else {
    startTime = `${year}-01-01T00:00:00.000Z`;
    endTime = `${year}-12-31T23:59:59.999Z`;
  }
  return { startTime, endTime };
}

function commitsMap(map, startTime, endTime) {
  let reference = new Date(findWeek(startTime));
  let endDate = new Date(endTime).getTime();

  while (reference.getTime() < endDate) {
    map.set(reference.toISOString(), {
      week: reference.toISOString(),
      total: 0,
      days: new Array(7).fill(0),
    });

    reference.setUTCDate(reference.getUTCDate() + 7);
  }

  return map;
}

export { dateRange, findWeek, dayIndex, numberRangeArray, commitsMap };
