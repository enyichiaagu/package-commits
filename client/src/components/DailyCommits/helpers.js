function calcDistribution(weeklyCommits) {
  let dist = [];
  // Get commits for every single day in the year
  const commitsDup = weeklyCommits.flatMap((week) => week.commits);

  // Eliminate duplicates from the commits array
  const commits = [...new Set(commitsDup)];

  // Sort array
  const sorted = commits.toSorted((a, b) => a - b);

  //remove zero from the commits
  const modifiedArr = sorted.slice(sorted.findIndex((n) => n > 0));

  //return empty array if its all zeroes
  if (modifiedArr[0] === 0) {
    return dist;
  }

  if (modifiedArr.length <= 4) {
    // the distribution is equal to the resulting values
    dist = modifiedArr.slice(0, 3);
  } else {
    // Divided the sorted array by 4
    const dividend = modifiedArr.length / 4;

    let temp = [0, 0, 0, 0];
    let upperBounds = temp.map((value, index) => {
      console.log(Math.round(index * dividend));
      return modifiedArr[Math.round(index * dividend) - 1];
    });
    dist = upperBounds.slice(1, upperBounds.length);
  }
  console.log(dist);
  // return the upper bounds which is first three elements of dist
  return dist;
}

export { calcDistribution };
