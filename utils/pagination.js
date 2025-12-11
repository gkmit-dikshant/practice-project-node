module.exports = (page, currLength, limit, total) => {
  let t = Math.floor(
    (Number(total) - Number(page) * Number(limit)) / Number(limit),
  );
  return {
    page: Number(page),
    count: currLength,
    remainingPage: t < 0 ? 0 : t,
  };
};
