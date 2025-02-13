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
  newDate.setUTCDate(newDate.getUTCDate() + numOfDays);

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

// The random value 1 means the generated commit numbers are random while 0 means they are all o
function genMockCommits(highestDayCommits = 0) {
  const randomYear = Boolean(highestDayCommits)
    ? 2010 + Math.floor(Math.random() * 10)
    : 2010;

  let data = [];
  let yearStart = `${randomYear}-01-01T00:00:00.000Z`;
  let yearEnd = `${randomYear}-12-31T23:59:59.999Z`;

  let newWeek = findWeek(yearStart);
  let endWeek = findWeek(yearEnd);

  let dummyCommits = [],
    currentDate;

  while (newWeek.getTime() <= endWeek.getTime()) {
    if (highestDayCommits !== 0) {
      for (let i = 0; i < 7; i++) {
        currentDate = addDay(newWeek, i);
        if (isValidDate(currentDate, yearStart, yearEnd)) {
          dummyCommits.push(Math.floor(Math.random() * highestDayCommits));
        } else {
          dummyCommits.push(null);
        }
      }
    } else {
      dummyCommits = new Array(7).fill(0);
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

export { addDay, genMockCommits };
