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

export { dateRange };
