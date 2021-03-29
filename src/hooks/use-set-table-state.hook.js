import {useContext} from "react";
import {raceContext} from "../containers/race-context";

export function useSetTableState() {
    const {setState} = useContext(raceContext);
    return setState;
};