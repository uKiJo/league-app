class FixtureParamaters {
    constructor(fixture, table, game, value, selecteTeam, opponentGoal, type) {
      this.data = {
        fixture: fixture,
        table: table,
        game: game,
        value: value,
        selecteTeam: selecteTeam,
        opponentGoal: opponentGoal,
        type: type
      }
    }
  
    get fixture() {return this.data.fixture;}
    get table() {return this.data.table;}
    get game() {return this.data.game;}
    get value() {return this.data.value;}
    get selecteTeam() {return this.data.selecteTeam;}
    get opponentGoal() {return this.data.opponentGoal;}
    get type() {return this.data.type;}

}



  module.exports = {FixtureParamaters};