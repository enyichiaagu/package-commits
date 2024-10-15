function isoToDate(timestamp) {
  return new Date(timestamp);
}

function findWeek(timestamp) {
  const date = isoToDate(timestamp);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  date.setUTCHours(0, 0, 0, 0);

  return date;
}

function addDay(date, numOfDays) {
  const newDate = new Date(date);
  newDate.setUTCDate(date.getUTCDate() + numOfDays);

  return newDate;
}

function isValidDate(current, yearStart, yearEnd) {
  const curr = current.getTime();
  const start = isoToDate(yearStart).getTime();
  const end = isoToDate(yearEnd).getTime();

  if (curr >= start && curr <= end) {
    return true;
  }

  return false;
}

function genMockCommits() {
  const randomYear = 2010 + Math.floor(Math.random() * 10);

  let data = [];
  let yearStart = `${randomYear}-01-01T00:00:00.000Z`;
  let yearEnd = `${randomYear}-12-31T23:59:59.999Z`;

  let newWeek = findWeek(yearStart);
  let endWeek = findWeek(yearEnd);

  let dummyCommits = [],
    currentDate;

  while (newWeek.getTime() <= endWeek.getTime()) {
    for (let i = 0; i < 7; i++) {
      currentDate = addDay(newWeek, i);
      if (isValidDate(currentDate, yearStart, yearEnd)) {
        dummyCommits.push(Math.floor(Math.random() * 4));
      } else {
        dummyCommits.push(null);
      }
    }

    data.push({
      week: newWeek.toISOString(),
      commits: dummyCommits,
    });

    // Mutate new week variable to the next week
    newWeek = addDay(newWeek, 7);

    // Change dummy commits to empty array
    dummyCommits = [];
  }

  return data;
}

export default genMockCommits;
