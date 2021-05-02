import { Game } from '../../domain/Game';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Piece, Team } from '../../domain/Piece';
import { Tile } from '../../domain/Tile';


const Cell = ({ children, style }: any) => <div style={{
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style
}} children={children} />;


const ColumnLabels = () => {
    const labels = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
    ];
    return <div style={{ display: 'flex' }}>
        <Cell />
        {labels.map((label, idx) => <Cell key={idx}>{label}</Cell>)}
        <Cell />
    </div>;
};

const RowLabel = ({ idx }: any) => <Cell>{8 - idx}</Cell>;

const PieceIcon = ({ piece, onClick, style }: any) => {
    if (piece !== null) {
        return <FontAwesomeIcon onClick={onClick} icon={piece.icon} style={{ color: piece.team, ...style }} />;
    }
    return null;
};

const GameTile = ({ tile, possibleMoves, isSelected, onTileClick }: any) => {
    const isPossibleMove = possibleMoves?.find((x: number[][]) => x[0] === tile.coords[0] && x[1] === tile.coords[1]);
    const hasPiece = tile.piece !== null;

    return <div style={{
        width: '50px',
        height: '50px',
        border: isPossibleMove ? '1px solid white' : (isSelected) ? '1px solid purple' : '1px solid transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: tile.piece?.team,
        background: ((tile.coords[0] + tile.coords[1]) % 2 === 0) ? 'transparent' : '#666666',
        cursor: hasPiece || isPossibleMove ? 'pointer' : ''
    }} onClick={() => onTileClick(tile)}>
        <PieceIcon piece={tile.piece} />
        <div style={{ fontSize: 9 }}>({`${tile.x},${tile.y}`})</div>
    </div>;
};

const CapturedArea = ({ capturedPieces, currentTeam, isPromotion, onPieceClick }: any) => <div
    style={{ display: 'flex', marginBottom: '20px', marginTop: '20px' }}>
    {capturedPieces.map((piece: Piece, idx: number) =>
        <PieceIcon
            style={{ cursor: (piece.team === currentTeam && isPromotion) ? 'pointer' : '' }}
            onClick={() => onPieceClick(piece)} key={idx}
            piece={piece} />
    )}
</div>;


interface IGridProps {
    game: Game;
    selectedTile?: Tile;
    isPromotion: boolean;
    currentTeam: Team;
    onTileClick: (tile: Tile) => void;
    onCapturedPieceClick: (piece: Piece) => void;
}

const Grid: React.FC<IGridProps> = ({
                                        game,
                                        selectedTile,
                                        isPromotion,
                                        currentTeam,
                                        onTileClick,
                                        onCapturedPieceClick
                                    }) => {

    const selectedPieceMoves = (selectedTile !== undefined && selectedTile?.piece !== null) ? game.getAllowedMoves(selectedTile.piece) : [];

    return <div>
        <CapturedArea
            capturedPieces={game.getTeamCapturedPieces(Team.black)}
            isPromotion={isPromotion}
            currentTeam={currentTeam}
            onPieceClick={onCapturedPieceClick}
        />
        <div style={{ border: '2px solid #666666' }}>
            <ColumnLabels />
            {game.rows.reverse().map((row, rowIdx) => <>
                <div style={{ display: 'flex' }} key={rowIdx}>
                    <RowLabel idx={rowIdx} />
                    {row.map((tile, colIdx) =>
                        <GameTile key={colIdx}
                                  tile={tile}
                                  possibleMoves={selectedPieceMoves}
                                  onTileClick={onTileClick}
                                  isSelected={selectedTile === tile}
                        />
                    )}
                    <RowLabel idx={rowIdx} />
                </div>
            </>)}
            <ColumnLabels />
        </div>
        <CapturedArea
            capturedPieces={game.getTeamCapturedPieces(Team.white)}
            isPromotion={isPromotion}
            currentTeam={currentTeam}
            onPieceClick={onCapturedPieceClick}
        />
    </div>;
};


export default Grid;