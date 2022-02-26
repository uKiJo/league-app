const updateFixture = require('./update');

test('update object', () => {
    const team = {
        id: 1,
        name: 'man city'
    };

    const game= {
        id: 1,
        home: 'whu',
        away: 'lei'
    }
    
    const mockData = [
        [
            {
                
            },
            
        ]
    ];

    const myTest = updateFixture(mockData, game, 1, team, 'team');
    console.log(myTest[0][0])
    
    // expect(myTest[0][0].team.goal).toBe(1)
    // expect(myTest[1][1].goal).toBe(1)

})





