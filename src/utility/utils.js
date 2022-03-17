const {arrayOfZeros} = require('../components/game/update');

function getLastThreeLetters(str) {
  return str.substring(str.length - 3);
}

export function addPropToTable(obj, days) {
  const arr = ["points", "pointsArr", 'goals', 'goalsArr', 'ga', 'gaArr', 'gd', 'w', 'wArr', 'd', 'dArr', 'l', 'lArr', 'p'];

  var obj2 = {};

  arr.map((e) =>
    getLastThreeLetters(e) === "Arr"
      ? (obj2 = { ...obj2, [`${e}`]: arrayOfZeros(days) })
      : (obj2 = { ...obj2, [`${e}`]: 0 })
  );

  return {
    ...obj,
    ...obj2,
  };
}
