class FixtureParamaters {
    constructor(fixture, game, value, selecteTeam, type) {
      this.data = {
        fixture: fixture,
        game: game,
        value: value,
        selecteTeam: selecteTeam,
        type: type
      }
    }
  
    get fixture() {return this.data.fixture;}
    get game() {return this.data.game;}
    get value() {return this.data.value;}
    get selecteTeam() {return this.data.selecteTeam;}
    get type() {return this.data.type;}

    getDayidx(fixture, game) {
        const idxArr = fixture.map((day) =>
          day.findIndex((dayGame) => dayGame.id === game.id)
        );

        return idxArr.findIndex((e) => e !== -1);
  }
}

  module.exports = {FixtureParamaters};