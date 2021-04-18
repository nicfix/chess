import React, {useState} from 'react';
import './App.css';
import {Game, Team, Tile} from "./domain/Game";
import Grid from "./ui/components/Grid";

function App() {
    const [selectedTile, setSelectedTile] = useState<Tile | undefined>(undefined);
    const [game, setGame] = useState<Game>(new Game());
    const [currentTeam, setCurrentTeam] = useState<Team>(Team.white);


    const onTileClick = (tile: Tile) => {

        if (selectedTile === undefined && tile.piece?.team !== currentTeam) {
            alert(`It's ${currentTeam} turn`);
            return;
        }

        if (selectedTile === undefined && tile.piece?.team === currentTeam) {
            setSelectedTile(tile);
            return;
        }

        if (tile.piece !== null && tile.piece.team === currentTeam) {
            setSelectedTile(tile);
            return;
        }

        if (tile.piece !== null && tile.piece.team !== currentTeam && selectedTile?.piece?.eat(game, tile)) {
            setGame(game);
            setSelectedTile(undefined);
            if (currentTeam === Team.white) {
                setCurrentTeam(Team.black);
            } else {
                setCurrentTeam(Team.white);
            }
            return;
        }

        if (selectedTile !== undefined && selectedTile.piece?.move(game, tile)) {
            setGame(game);
            setSelectedTile(undefined);
            if (currentTeam === Team.white) {
                setCurrentTeam(Team.black);
            } else {
                setCurrentTeam(Team.white);
            }
            return;
        }

        alert("You cannot do this move");
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Turn:{currentTeam}</h1>
                <Grid game={game} onTileClick={onTileClick} selectedTile={selectedTile}/>
            </header>
        </div>
    );
}

export default App;
