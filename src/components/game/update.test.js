const {updateFixture, getDayidx, getGameidx, getOptions, options} = require('./update');

test('index tests', () => {

    const mockFix = [
        [
            {
                id: 1,

            }
        ]
    ]

    const game = {
        id: 1
    }
    

    const test = getDayidx(mockFix, game);
    expect(test).toEqual(0);

    const test2 = getGameidx(mockFix, game)
    expect(test2).toEqual(0);
})



test('update fixture test', () => {
    const mockFix = [
        [
            {
                id: 1,

            }
        ]
    ]

    const game = {
        id: 1
    }

    const team = {
        name: 'man city'
    }

    const obj = {
        fixture: mockFix,
        game,
        value: 1,
        team,
        type: 'team'
    }

    const test = updateFixture(obj)

    expect(test[0][0].team.goal).toBe(1)

})

test('getOptions function tests', () => {
    const options = getOptions(1, 0, 'homeTeam');
    console.log(options);
})


describe('Table test', () => {
    test('updateTable function test', () => {
        const opts = options(2, 1);
        expect(opts.option1).toBe(0)
    })
})