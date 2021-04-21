import React, {useState} from 'react';
import './App.css';
import {Game} from "./domain/Game";
import Grid from "./ui/components/Grid";
import {Piece, Team} from "./domain/Piece";
import {Tile} from "./domain/Tile";
import {PromotionState, SelectPieceState} from "./domain/State";
import History from "./ui/components/History";

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
                <div style={{display: 'flex', alignItems: "space-between"}}>
                    <div style={{
                        marginRight: "50px",
                        width: "400px",
                        textAlign: "left"
                    }}>
                        <h3>History</h3>
                        <History game={game}/>
                    </div>
                    <div>
                        <h3>{currentTeam} player:<br/> {state.label()}</h3>
                        <Grid
                            currentTeam={currentTeam}
                            isPromotion={isPromotion}
                            game={game}
                            onTileClick={onTileClick}
                            selectedTile={selectedTile}
                            onCapturedPieceClick={onCapturedPieceClick}
                        />
                    </div>

                </div>
            </header>
        </div>
    );
}

export default App;
