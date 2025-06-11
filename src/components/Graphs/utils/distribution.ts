import type { MONTHS } from './constants';
import { addDay, type WeeklyCommits } from './mockCommits';

function calcDistribution(weeklyCommits: WeeklyCommits[]) {
  let dist: WeeklyCommits['commits'] = [];
  // Get commits for every single day in the year
  const commitsDup = weeklyCommits.flatMap((week) => week.commits);

  // Eliminate duplicates from the commits array
  const commits = [...new Set(commitsDup)];

  // Sort array
  const sorted = commits.toSorted((a, b) => Number(a) - Number(b));

  //remove zero from the commits
  const modifiedArr = sorted.slice(sorted.findIndex((n) => Number(n) > 0));

  //return empty array if its all zeroes
  if (modifiedArr[0] === 0) {
    return dist as number[];
  }

  if (modifiedArr.length <= 4) {
    // the distribution is equal to the resulting values
    dist = modifiedArr.slice(0, 3);
  } else {
    // Divided the sorted array by 4
    const dividend = modifiedArr.length / 4;

    let temp = [0, 0, 0, 0];
    let upperBounds = temp.map((_value, index) => {
      return modifiedArr[Math.round(index * dividend) - 1];
    });
    dist = upperBounds.slice(1, upperBounds.length);
  }
  // return the upper bounds which is first three elements of dist
  return dist as number[];
}

function monthlyCommitsY(highestMonthlyCommits: number) {
  if (highestMonthlyCommits === 0) return [];
  else if (highestMonthlyCommits <= 4) {
    return new Array(highestMonthlyCommits + 1)
      .fill(0)
      .map((_, index) => index);
  } else {
    const maxYValues = [20, 40, 100, 200, 400, 1000, 2000, 4000, 10000, 20000];

    let maxY =
      maxYValues.find((num) => highestMonthlyCommits <= num) ??
      maxYValues[maxYValues.length - 1];
    const values = new Array(5).fill(0).map((_, index) => (maxY * index) / 4);

    return values.sort((a, b) => a - b);
  }
}

export interface MonthlyCommits {
  id: number;
  month: string;
  commits: number;
}

function weeklyToMonthlyCommits(
  weeklyCommits: WeeklyCommits[],
  months: typeof MONTHS
) {
  let finalArr: MonthlyCommits[] = [];
  let commitMonthIndex: number, currentMonthIndex: number;

  // if (!weeklyCommits) {
  //   return months.map((month, index) => ({ id: index, month, commits: 0 }));
  // }

  weeklyCommits.forEach((weekObj) => {
    let { week, commits } = weekObj;

    commits.forEach((numOfCommits, index) => {
      commitMonthIndex =
        numOfCommits !== null ? addDay(week, index).getMonth() : NaN;
      if (isNaN(commitMonthIndex)) return;

      if (isNaN(currentMonthIndex) || commitMonthIndex !== currentMonthIndex) {
        currentMonthIndex = commitMonthIndex;

        finalArr.push({
          id: finalArr.length,
          month: months[currentMonthIndex],
          commits: Number(numOfCommits),
        });
      } else {
        finalArr[finalArr.length - 1].commits += Number(numOfCommits);
      }
    });
  });

  return finalArr;
}

export { calcDistribution, monthlyCommitsY, weeklyToMonthlyCommits };
