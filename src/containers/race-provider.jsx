import React from 'react';
import {raceContext} from "./race-context";
import {useState} from "react";
import jsonData from '../data/data.json'

export const RaceProvider = ({
                                 children
                             }) => {
    const [state, setState] = useState({
        data: jsonData,
        selectedHorses: [],
        visibleColumns: {
            id: true,
            horse: true,
            lastSix: true,
            jockey: true,
            color: true,
            weight: true,
            gear: true,
            rating: true,
            draw: true,
            trainer: true,
            priority: true,
        },
        fieldNames: [
            'horse',
            'lastSix',
            'jockey',
            'color',
            'weight',
            'gear',
            'rating',
            'draw',
            'trainer',
            'priority',
        ]
    })

    return <raceContext.Provider value={{
        ...state,
        setState
    }}>
        {children}
    </raceContext.Provider>
}