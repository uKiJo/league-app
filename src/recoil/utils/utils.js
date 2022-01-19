export const generateFirstDay = (arr) => {
  var fixture = [];
  
  let daysNum = (arr.length/2) -1;

  let day = firstDay(arr);

  fixture = [...fixture, day];

  let gw = 0;

  while (gw !== daysNum) {
    
    let evenDays = patternOne(fixture);
    fixture = [...fixture, evenDays];
    let oddDays = patternTwo(fixture);
    fixture = [...fixture, oddDays];

    gw++;
  }

  return fixture;
};

const firstDay = (arr) => {

  let day = [];

  while (arr.length) {
    let game = {};
    //pick a random index

    let randomIdx = Math.floor(Math.random() * arr.length);
    let homeTeam = arr[randomIdx];
    // game = { ...game, homeTeam };
    arr = [...arr.slice(0, randomIdx), ...arr.slice(randomIdx + 1)];
    let randomIdx2 = Math.floor(Math.random() * arr.length);
    let awayTeam = arr[randomIdx2];
    game = { ...game, id: getId(), homeTeam, awayTeam };
    arr = [...arr.slice(0, randomIdx2), ...arr.slice(randomIdx2 + 1)];

    day = [...day, game];
  
  }

  return day;
}

const patternOne = (arr) => {
  var day = [];
  // let game1 = {};
  // let game2 = {};
  let rest = [];
  // let lastGame = {};
  let lastDay = arr[arr.length - 1];

  let game1 = {
    id: getId(),
    homeTeam: lastDay[1].awayTeam,
    awayTeam: lastDay[0].homeTeam,
  };

  let game2 = {
    id: getId(),
    homeTeam: lastDay[2].awayTeam,
    awayTeam: lastDay[0].awayTeam,
  };

  for (let i = 3; i < lastDay.length; i++) {
    
    let game = {
      id: getId(),
      homeTeam: lastDay[i].awayTeam,
      awayTeam: lastDay[i - 2].homeTeam,
    };
    rest = [...rest, game];
  }

  let lastGame = {
    id: getId(),
    homeTeam: lastDay[lastDay.length - 1].homeTeam,
    awayTeam: lastDay[lastDay.length - 2].homeTeam,
  };

  

  

  return [...day, game1, game2, ...rest, lastGame];
};

const patternTwo = (arr) => {
  var day = [];
  // let game1 = {};
  // let game2 = {};
  let rest = [];
  // let lastGame = {};
  let lastDay = arr[arr.length - 1];

  let game1 = {
    id: getId(),
    homeTeam: lastDay[0].awayTeam,
    awayTeam: lastDay[1].homeTeam,
  };
  let game2 = {
    id: getId(),
    homeTeam: lastDay[0].homeTeam,
    awayTeam: lastDay[2].homeTeam,
  };

  for (let i = 3; i < lastDay.length; i++) {
    let game = {
      id: getId(),
      homeTeam: lastDay[i - 2].awayTeam,
      awayTeam: lastDay[i].homeTeam,
    };
    rest = [...rest, game];
  }

  let lastGame = {
    id: getId(),
    homeTeam: lastDay[lastDay.length - 2].awayTeam,
    awayTeam: lastDay[lastDay.length - 1].awayTeam,
  };

  

  return [...day, game1, game2, ...rest, lastGame];
};

let i = 0;

function getId(){
  return i++;
}
