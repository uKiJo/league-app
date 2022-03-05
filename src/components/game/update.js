// by props we mean table properties, like points / goalsFor / goalsAgainst / wins ...etc.

const updateFixture = (data) => {

  const {fixture, game } = data;
  const dayIdx = getDayidx(fixture, game);
  const gameIdx = getGameidx(fixture, game);
  const selectedGame = fixture[dayIdx][gameIdx];
  const selectedDay = fixture[dayIdx];
  const updateSelectedGame = replaceItemAtIndex(selectedDay, gameIdx, updateGameObject(data, selectedGame));

  return replaceItemAtIndex(fixture, dayIdx, updateSelectedGame);
};

const updateGameObject = (data, game) => {

  const { selecteTeam, type, value } = data;
  
  return {
    ...game,
    [type]: {
      ...selecteTeam,
      goal: value,
    }
  }
}

const getDayidx = (fixture, game) => {
  const idxArr = fixture.map((day) =>
    day.findIndex((dayGame) => dayGame.id === game.id)
  );

  return idxArr.findIndex((e) => e !== -1);
};

const getGameidx = (fixture, game) => {
  const idxArr = fixture.map((day) =>
    day.findIndex((dayGame) => dayGame.id === game.id)
  );

  return idxArr.find((e) => e !== -1);
};

const options = (value, opponentGoal) => {
  return {
    option1: value < opponentGoal ? 3 : value > opponentGoal ? 0 : 1,
    option2: value > opponentGoal ? 3 : value < opponentGoal ? 0 : 1,

    option3: value > opponentGoal ? 1 : 0,
    option4: value < opponentGoal ? 1 : 0,
    option5: value === opponentGoal ? 1 : 0,
  }
}

const updateTable = (data) => {

  const { fixture, table, game, value, opponentGoal, type } = data;
  
  const dayIdx = getDayidx(fixture, game)

  const homeTeamIdx = table.findIndex(
    (team) => team.name === game.homeTeam.name
  );
  const awayTeamIdx = table.findIndex(
    (team) => team.name === game.awayTeam.name
  );

  if (opponentGoal && value) {

    let { awayOptions, homeOptions } = getOptions(value, opponentGoal, type);

    const updateHomeTeam = updateAll(
      table,
      homeTeamIdx,
      dayIdx,
      homeOptions
    );

    const updateAwayTeam = updateAll(
      updateHomeTeam,
      awayTeamIdx,
      dayIdx,
      awayOptions
    );

    return updateAwayTeam.sort((a, b) => b.points - a.points);
  }
  //else if input is deleted reset values to 0
  else {
    const updateHomeTeam = updateAll(
      table,
      homeTeamIdx,
      dayIdx,
      ArrayOfZeros(6)
    );

    const updateAwayTeam = updateAll(
      updateHomeTeam,
      awayTeamIdx,
      dayIdx,
      ArrayOfZeros(6)
    );
    return updateAwayTeam.sort((a, b) => b.points - a.points);
  }
};

const ArrayOfZeros = (n) => {
  return Array(n).fill(0);
}

const updateProp = (teamPropVal, dayIdx, newValue) => {
  const teamPropArr = teamPropVal;
  return replaceItemAtIndex(teamPropArr, dayIdx, newValue);
};

const updateAll = (arr, idx, dayIdx, propOpt) => {

  var propUp;

  let arr2 = propEntries(arr, idx, dayIdx, propOpt);
 
  arr2.map((e) => {
    const prop = reduceProp(e[1]);
    propUp = replaceItemAtIndex(arr, idx, {
      ...arr[idx],
      [`${e[0]}`]: e[1],
      [`${e[0]}`.substring(0, `${e[0]}`.length - 3)]: prop,
    });
    arr = propUp;
    
  });

  return propUp;
};

const reduceProp = (prop) => {
  return prop.reduce(reducer, 0);
};

//create an array containing properties' keys and values
const propEntries = (arr, idx, dayIdx, propOptions) => {
   
  let filterNonArrProp = Object.entries(arr[idx]).filter((el) =>
    Array.isArray(el[1])
  );

  let propObj = Object.fromEntries(filterNonArrProp);

  let propKeys = Object.keys(propObj);

  let entriesProp = propKeys.map((e, index) => {
    let updatedProp = updateProp(
      arr[idx][`${e}`],
      dayIdx,
      propOptions[index]
    );
    return [e, updatedProp];
  });
 
  return entriesProp;
};

function getOptions(value, opponentGoal, type) {
  const optionObj = options(value, opponentGoal);

  const { option1, option2, option3, option4, option5 } = optionObj;

  let awayOptions = [
    type === "homeTeam" ? option1 : option2,
    type === "homeTeam" ? parseInt(opponentGoal) : value,
    type === "homeTeam" ? value : parseInt(opponentGoal),
    type === "homeTeam" ? option4 : option3,
    option5,
    type === "homeTeam" ? option3 : option4,
  ];

  let homeOptions = [
    type === "homeTeam" ? option2 : option1,
    type === "homeTeam" ? value : parseInt(opponentGoal),
    type === "homeTeam" ? parseInt(opponentGoal) : value,
    type === "homeTeam" ? option3 : option4,
    option5,
    type === "homeTeam" ? option4 : option3,
  ];
  return { awayOptions, homeOptions };
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const reducer = (previousValue, currentValue) =>
  previousValue + parseInt(currentValue);

module.exports = { updateFixture, getDayidx, getGameidx, updateTable, propEntries, getOptions };

///////////////////////////////////////
