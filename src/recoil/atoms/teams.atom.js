import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const teamsState = atom({
    key: 'teamsState',
    default: [1, 2, 3, 4, 5, 6, 7, 8],
});

export const fixtureState = atom ({
    key: 'fixtureState',
    default: [],
    // effects_UNSTABLE: [persistAtom],
});



export const tableState = atom({
    key: 'tableState',
    default: [],
    // effects_UNSTABLE: [persistAtom],
})

export const myLeaguesState = atom({
    key: 'myLeaguesState',
    default: [],
})