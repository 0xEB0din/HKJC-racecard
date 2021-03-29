import {useContext} from "react";
import {raceContext} from "../containers/race-context";

export function useTableData() {
    const {data} = useContext(raceContext);
    return data;
};