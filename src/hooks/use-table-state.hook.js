import {useContext} from "react";
import {raceContext} from "../containers/race-context";

export function useTableState() {
    const {setState: _, ...rest} = useContext(raceContext);
    return rest
};