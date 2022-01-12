import { atom } from "recoil";

export const teamsState = atom({
    key: 'teamsState',
    default: [1, 2, 3, 4, 5, 6, 7, 8],
});

export const fixtureState = atom ({
    key: 'fixtureState',
    default: [],
});