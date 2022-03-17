const {arrayOfZeros} = require('../components/game/update');

function getLastThreeLetters(str) {
  return str.substring(str.length - 3);
}

export function addPropToTable(obj) {
  const arr = ["points", "pointsArr"];

  var obj2 = {};

  arr.map((e) =>
    getLastThreeLetters(e) === "Arr"
      ? (obj2 = { ...obj2, [`${e}`]: arrayOfZeros(6) })
      : (obj2 = { ...obj2, [`${e}`]: 0 })
  );

  return {
    ...obj,
    ...obj2,
  };
}
