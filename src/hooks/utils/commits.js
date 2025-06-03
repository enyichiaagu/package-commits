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

function getCommitsOrContributors(commitsArr, range) {
  let template = getTemplate(range),
    contrMap = new Map(),
    weekIndex,
    mint = {};

  if (!commitsArr || commitsArr.length === 0)
    return { commits: template, contributors: [] };

  commitsArr.forEach((ghCommit) => {
    let commitISODate = ghCommit.commit.committer.date;

    weekIndex = template.findIndex(
      (tempCommit) => getWeek(commitISODate).toISOString() === tempCommit.week
    );
    let dayIndex = new Date(commitISODate).getUTCDay();
    template[weekIndex].commits[dayIndex]++;

    if (!ghCommit.author || !ghCommit.committer) {
      mint = { login: 'unknown', avatar_url: null };
    } else {
      mint = ghCommit.author;
    }
    let { login, avatar_url } = mint;
    if (contrMap.has(login)) {
      let entry = contrMap.get(login);
      entry.contributions++;
      return;
    }
    contrMap.set(login, { login, avatar_url, contributions: 1 });
  });

  let contributors = Array.from(contrMap.values()).sort(
    (a, b) => b.contributions - a.contributions
  );

  return {
    commits: template,
    contributors,
  };
}

export { getCommitsOrContributors };
