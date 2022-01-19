import { selector } from "recoil";
import { tableState } from "../atoms/teams.atom";



export const tableStats = selector({
    key: 'tableStats',
    get: ({get}) => {
        const table = get(tableState);

        return table.sort((a, b) =>  {
            return a.id - b.id;
        })
        
    }
})