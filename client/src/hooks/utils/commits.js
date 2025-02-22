function getWeek(isoString) {
  let week = new Date(isoString);
  let weekCopy = new Date(week.getTime());
  weekCopy.setUTCDate(week.getUTCDate() - week.getUTCDay());
  weekCopy.setUTCHours(0, 0, 0, 0);

  return weekCopy;
}

// Add specified numbers of days to a day, returns date object
function addDaysToDate(date, num) {
  let useDate = new Date(date.getTime());
  useDate.setUTCDate(date.getUTCDate() + num);

  return useDate;
}

function isValidDate(range, date) {
  let startTime = new Date(range.start).getTime();
  let endTime = new Date(range.end).getTime();
  let current = new Date(date.getTime()).getTime();

  return startTime <= current && current <= endTime;
}

function getTemplate(range) {
  let template = [];
  let counterWeek = getWeek(range.start);
  let endWeek = getWeek(range.end);

  while (counterWeek.getTime() <= endWeek.getTime()) {
    let weekArr = Array(7)
      .fill(null)
      .map((_value, index) =>
        isValidDate(range, addDaysToDate(counterWeek, index)) ? 0 : null
      );

    let weekObj = { week: counterWeek.toISOString(), commits: weekArr };

    template.push(weekObj);
    counterWeek = addDaysToDate(counterWeek, 7);
  }

  return template;
}

function getWeeklyCommits(commitsArr, range) {
  let template = getTemplate(range),
    weekIndex;

  commitsArr.forEach((ghCommit) => {
    let commitIsoDate =
      ghCommit.commit?.author.date || ghCommit.commit?.committer.date;
    weekIndex = template.findIndex(
      (tempCommit) => getWeek(commitIsoDate).toISOString() === tempCommit.week
    );

    let dayIndex = new Date(commitIsoDate).getUTCDay();

    template[weekIndex].commits[dayIndex]++;
  });

  return template;
}

export { getWeeklyCommits };
