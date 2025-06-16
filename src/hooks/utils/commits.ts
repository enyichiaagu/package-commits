function getWeek(isoString: string) {
  let week = new Date(isoString);
  let weekCopy = new Date(week.getTime());
  weekCopy.setUTCDate(week.getUTCDate() - week.getUTCDay());
  weekCopy.setUTCHours(0, 0, 0, 0);

  return weekCopy;
}

// Add specified numbers of days to a day, returns date object
function addDaysToDate(date: Date, num: number) {
  let useDate = new Date(date.getTime());
  useDate.setUTCDate(date.getUTCDate() + num);

  return useDate;
}

interface PeriodRange {
  start: string;
  end: string;
}

function isValidDate(range: PeriodRange, date: Date) {
  let startTime = new Date(range.start).getTime();
  let endTime = new Date(range.end).getTime();
  let current = new Date(date.getTime()).getTime();

  return startTime <= current && current <= endTime;
}

export interface WeeklyCommits {
  week: string;
  commits: (number | null)[];
}

function getTemplate(range: PeriodRange) {
  let template: WeeklyCommits[] = [];
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

interface GitHubUser {
  name: string;
  email: string;
  date: string;
}

export interface FetchedCommit {
  commit: {
    author: GitHubUser;
    committer: GitHubUser;
  };
  author: {
    login: string;
    avatar_url: string | null;
  };
  committer: {
    login: string;
    avatar_url: string | null;
  };
}

function getCommitsOrContributors(
  commitsArr: FetchedCommit[],
  range: PeriodRange
) {
  let template = getTemplate(range),
    contrMap = new Map<
      string,
      { contributions: number } & FetchedCommit['author']
    >(),
    weekIndex,
    mint: FetchedCommit['author'];

  if (!commitsArr || commitsArr.length === 0)
    return { commits: template, contributors: [] };

  commitsArr.forEach((ghCommit) => {
    let commitISODate = ghCommit.commit.committer.date;

    weekIndex = template.findIndex(
      (tempCommit) => getWeek(commitISODate).toISOString() === tempCommit.week
    );
    let dayIndex = new Date(commitISODate).getUTCDay();
    template[weekIndex].commits[dayIndex] =
      Number(template[weekIndex].commits[dayIndex]) + 1;

    if (!ghCommit.author || !ghCommit.committer) {
      mint = { login: 'unknown', avatar_url: null };
    } else {
      mint = ghCommit.author;
    }
    let { login, avatar_url } = mint;
    if (contrMap.has(login)) {
      let entry = contrMap.get(login);
      if (entry) entry.contributions++;
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
