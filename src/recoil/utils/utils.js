export const generateFirstDay = (arr) => {
  var fixture = [];
  var day = [];

  let daysNum = (arr.length/2) -1;

  while (arr.length) {
    let game = {};
    //pick a random index
    let randomIdx = Math.floor(Math.random() * arr.length);
    let homeTeam = arr[randomIdx];
    game = { ...game, homeTeam };
    arr = [...arr.slice(0, randomIdx), ...arr.slice(randomIdx + 1)];
    let randomIdx2 = Math.floor(Math.random() * arr.length);
    let awayTeam = arr[randomIdx2];
    game = { ...game, awayTeam };
    arr = [...arr.slice(0, randomIdx2), ...arr.slice(randomIdx2 + 1)];

    day = [...day, game];
  }

  fixture = [...fixture, day];

  let gw = 0;
  while (gw !== daysNum) {
    
    let rest = patternOne(fixture);
    fixture = [...fixture, rest];
    let rest2 = patternTwo(fixture);
    fixture = [...fixture, rest2];

    gw++;
  }

  return fixture;
};

const patternOne = (arr) => {
  var day = [];
  let game1 = {};
  let game2 = {};
  let rest = [];
  let lastGame = {};
  let lastDay = arr[arr.length - 1];

  game1 = {
    ...game1,
    homeTeam: lastDay[1].awayTeam,
    awayTeam: lastDay[0].homeTeam,
  };
  game2 = {
    ...game2,
    homeTeam: lastDay[2].awayTeam,
    awayTeam: lastDay[0].awayTeam,
  };
  lastGame = {
    ...lastGame,
    homeTeam: lastDay[lastDay.length - 1].homeTeam,
    awayTeam: lastDay[lastDay.length - 2].homeTeam,
  };

  for (let i = 3; i < lastDay.length; i++) {
    let game = {};
    game = {
      ...game,
      homeTeam: lastDay[i].awayTeam,
      awayTeam: lastDay[i - 2].homeTeam,
    };
    rest = [...rest, game];
  }

  day = [...day, game1, game2, ...rest, lastGame];

  return day;
};

const patternTwo = (arr) => {
  var day = [];
  let game1 = {};
  let game2 = {};
  let rest = [];
  let lastGame = {};
  let lastDay = arr[arr.length - 1];

  game1 = {
    ...game1,
    homeTeam: lastDay[0].awayTeam,
    awayTeam: lastDay[1].homeTeam,
  };
  game2 = {
    ...game2,
    homeTeam: lastDay[0].homeTeam,
    awayTeam: lastDay[2].homeTeam,
  };
  lastGame = {
    ...lastGame,
    homeTeam: lastDay[lastDay.length - 2].awayTeam,
    awayTeam: lastDay[lastDay.length - 1].awayTeam,
  };

  for (let i = 3; i < lastDay.length; i++) {
    let game = {};
    game = {
      ...game,
      homeTeam: lastDay[i - 2].awayTeam,
      awayTeam: lastDay[i].homeTeam,
    };
    rest = [...rest, game];
  }

  day = [...day, game1, game2, ...rest, lastGame];

  return day;
};
