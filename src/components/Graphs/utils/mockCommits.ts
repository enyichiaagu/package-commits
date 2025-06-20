function isoToDate(timestamp: string) {
  return new Date(timestamp);
}

function findWeek(timestamp: string) {
  const date = isoToDate(timestamp);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  date.setUTCHours(0, 0, 0, 0);

  return date;
}

function addDay(date: Date | string, numOfDays: number) {
  const newDate = new Date(date);
  newDate.setUTCDate(newDate.getUTCDate() + numOfDays);

  return newDate;
}

function isValidDate(current: Date, yearStart: string, yearEnd: string) {
  const curr = current.getTime();
  const start = isoToDate(yearStart).getTime();
  const end = isoToDate(yearEnd).getTime();

  if (curr >= start && curr <= end) {
    return true;
  }

  return false;
}

export interface WeeklyCommits {
  week: string;
  commits: Array<number | null>;
}

function genMockCommits(highestDayCommits = 0) {
  const randomYear = highestDayCommits
    ? 2010 + Math.floor(Math.random() * 10)
    : 2010;

  let data: WeeklyCommits[] = [];
  let yearStart = `${randomYear}-01-01T00:00:00.000Z`;
  let yearEnd = `${randomYear}-12-31T23:59:59.999Z`;

  let newWeek = findWeek(yearStart);
  let endWeek = findWeek(yearEnd);

  let dummyCommits: Array<number | null> = [],
    currentDate: Date;

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
