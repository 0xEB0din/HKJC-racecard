import {createContext} from 'react';
import jsonData from '../data/data.json'

export const raceContext = createContext({
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
    ],
    setState() {

    }
})

