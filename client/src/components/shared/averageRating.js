const averageRating = (obj) => {
  let wholeTotal = 0;
  let responseTotal = 0;
  if (obj) {
    const possibleRatings = Object.keys(obj);
    possibleRatings.forEach((rating) => {
      wholeTotal += (Number(obj[rating]) * Number(rating));
      responseTotal += Number(obj[rating]);
    });
    const result = wholeTotal / responseTotal;
    if (Number.isNaN((Math.round(result * 4) / 4).toFixed(1))) {
      return 0;
    }
    return result.toFixed(1);
  }
};

export default averageRating;
