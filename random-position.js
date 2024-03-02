const randomNumber = function (maximun) {
  return Math.round(Math.random() * maximun);
};

const randomPosition = function (maxRow, maxColumn) {
  const row = randomNumber(maxRow);
  const column = randomNumber(maxColumn);
  return { row, column };
};

exports.randomPosition = randomPosition;