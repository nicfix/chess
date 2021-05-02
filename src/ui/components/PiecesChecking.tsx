import React from 'react';
import { Game } from '../../domain/Game';
import { Team } from '../../domain/Piece';

interface IHistoryProps {
    game: Game;
    currentTeam: Team;
}

const PiecesChecking: React.FC<IHistoryProps> = ({ game, currentTeam }) => {
    const piecesChecking = game.getKing(currentTeam)?.piecesChecking(game);

    return <>
        {
            (piecesChecking !== undefined && piecesChecking.length !== 0) ?
                <div style={{
                    height: '700px',
                    overflowY: 'auto'
                }}>
                    <table>
                        <tbody>
                        {piecesChecking?.map(piece =>
                            <tr>
                                <td>{piece.team[0]}{piece.label}</td>
                                <td>{piece.currentTile.coordsLabels}</td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div> :
                <p>No pieces are checking {currentTeam} king!</p>
        }
    </>;
};

export default PiecesChecking;