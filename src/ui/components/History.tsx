import React from "react";
import {Game} from "../../domain/Game";

interface IHistoryProps {
    game: Game;
}

const History: React.FC<IHistoryProps> = ({game}) => <>
    <div style={{
        height: '700px',
        overflowY: 'auto',
    }}>
        <table>
            <tbody>
            {game.history.map(move =>
                <tr>
                    <td>{move.piece.team[0]}{move.piece.label}</td>
                    <td>{move.startTile.coordsLabels}</td>
                    <td>{move.targetTile.coordsLabels}</td>
                </tr>)
            }
            </tbody>
        </table>
    </div>
</>;

export default History;