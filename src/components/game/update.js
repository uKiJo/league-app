// by props we mean table properties, like points / goals for / wins...etc.

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

  const { selecteTeam, type, value} = data;
  
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

const updateTable = (fixture, table, value, game, otherTeamGoal, type) => {
  let int = fixture.map((day) =>
    day.findIndex((dayGame) => dayGame.id === game.id)
  );

  const dayIdx = int.findIndex((e) => e !== -1);
  // const gameIdx = int.find((e) => e !== -1);

  const homeTeamIdx = table.findIndex(
    (team) => team.name === game.homeTeam.name
  );
  const awayTeamIdx = table.findIndex(
    (team) => team.name === game.awayTeam.name
  );

  if (otherTeamGoal && value) {
    const option1 = value < otherTeamGoal ? 3 : value > otherTeamGoal ? 0 : 1;
    const option2 = value > otherTeamGoal ? 3 : value < otherTeamGoal ? 0 : 1;

    const option3 = value > otherTeamGoal ? 1 : 0;
    const option4 = value < otherTeamGoal ? 1 : 0;
    const option5 = value === otherTeamGoal ? 1 : 0;

    let propOptionsAway = [
      type === "homeTeam" ? option1 : option2,
      type === "homeTeam" ? parseInt(otherTeamGoal) : value,
      type === "homeTeam" ? value : parseInt(otherTeamGoal),
      type === "homeTeam" ? option4 : option3,
      option5,
      type === "homeTeam" ? option3 : option4,
    ];

    let propOptionsHome = [
      type === "homeTeam" ? option2 : option1,
      type === "homeTeam" ? value : parseInt(otherTeamGoal),
      type === "homeTeam" ? parseInt(otherTeamGoal) : value,
      type === "homeTeam" ? option3 : option4,
      option5,
      type === "homeTeam" ? option4 : option3,
    ];

    const updateHomeTeam = updateAll(
      table,
      homeTeamIdx,
      keyValueProp(
        table,
        homeTeamIdx,
        otherTeamGoal,
        value,
        dayIdx,
        propOptionsHome
      )
    );

    const updateAwayTeam = updateAll(
      updateHomeTeam,
      awayTeamIdx,
      keyValueProp(
        updateHomeTeam,
        awayTeamIdx,
        otherTeamGoal,
        value,
        dayIdx,
        propOptionsAway
      )
    );

    return updateAwayTeam.sort((a, b) => b.points - a.points);
  }
  //else if input is deleted reset values to 0
  else {
    const updateHomeTeam = updateAll(
      table,
      homeTeamIdx,
      keyValueProp(
        table,
        homeTeamIdx,
        otherTeamGoal,
        value,
        dayIdx,
        [0, 0, 0, 0, 0, 0]
      )
    );

    const updateAwayTeam = updateAll(
      updateHomeTeam,
      awayTeamIdx,
      keyValueProp(
        updateHomeTeam,
        awayTeamIdx,
        otherTeamGoal,
        value,
        dayIdx,
        [0, 0, 0, 0, 0, 0]
      )
    );
    return updateAwayTeam.sort((a, b) => b.points - a.points);
  }
};

const updateProp = (teamPropVal, dayIdx, newValue) => {
  const teamPropArr = teamPropVal;
  return replaceItemAtIndex(teamPropArr, dayIdx, newValue);
};

const updateAll = (arr, idx, arr2) => {
  var propUp;
  // console.log(arr2);
  arr2.map((e) => {
    // console.log([`${e[0]}`.substring(0, `${e[0]}`.length-3)], e[1]);
    const prop = reduceProp(e[1]);
    propUp = replaceItemAtIndex(arr, idx, {
      ...arr[idx],
      [`${e[0]}`]: e[1],
      [`${e[0]}`.substring(0, `${e[0]}`.length - 3)]: prop,
    });
    arr = propUp;
    // console.log(propUp)
  });

  // console.log(propUp)

  return propUp;
};

const reduceProp = (prop) => {
  return prop.reduce(reducer, 0);
};

//create an array containing props keys and values
const keyValueProp = (
  table,
  homeTeamIdx,
  otherTeamGoal,
  value,
  dayIdx,
  propOptions
) => {
  let filterNonArrProp = Object.entries(table[homeTeamIdx]).filter((el) =>
    Array.isArray(el[1])
  );

  let propObj = Object.fromEntries(filterNonArrProp);

  let propKeys = Object.keys(propObj);

  let c = propKeys.map((e, index) => {
    let updatedProp = updateProp(
      table[homeTeamIdx][`${e}`],
      dayIdx,
      propOptions[index]
    );
    return [e, updatedProp];
  });
  // console.log(c)
  return c;
};

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const reducer = (previousValue, currentValue) =>
  previousValue + parseInt(currentValue);

module.exports = { updateFixture, getDayidx, getGameidx, updateTable };

///////////////////////////////////////
