import RaceCard from "./components/RaceCard"
import {Box, Container} from '@material-ui/core';
import './App.css';
import React from "react";
import {RaceProvider} from "./containers/race-provider";

function App() {
    return (
        <div>
            <Box display="flex" mx="auto" m={3}>
                <Container>
                    <RaceProvider>
                        <RaceCard/>
                    </RaceProvider>
                </Container>
            </Box>
        </div>
    );
}

export default App;