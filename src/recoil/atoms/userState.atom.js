import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: false,
});

export const isCreatedState = atom({
    key: 'isCreated',
    default: false,
})