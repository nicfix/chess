import React, {useState} from 'react';
import './App.css';
import {Game} from "./domain/Game";
import Grid from "./ui/components/Grid";
import {Piece, Team} from "./domain/Piece";
import {Tile} from "./domain/Tile";
import {PromotionState, SelectPieceState} from "./domain/State";

function App() {
    const [state, setState] = useState(
        new SelectPieceState(
            {game: new Game(), currentTeam: Team.white}
        )
    );

    const {selectedTile, game, currentTeam} = state.data;
    const isPromotion = state instanceof PromotionState;

    const onTileClick = (tile: Tile) => {
        setState(state.next({clickedTile: tile}));
    }

    const onCapturedPieceClick = (piece: Piece) => {
        if (isPromotion) {
            setState(state.next({promotedPiece: piece}))
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Turn: {currentTeam} player</h1>
                <h2>{state.label()}</h2>
                <Grid
                    currentTeam={currentTeam}
                    isPromotion={isPromotion}
                    game={game}
                    onTileClick={onTileClick}
                    selectedTile={selectedTile}
                    onCapturedPieceClick={onCapturedPieceClick}
                />
            </header>
        </div>
    );
}

export default App;
