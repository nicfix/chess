import { Piece, Team } from './Piece';
import { Tile } from './Tile';
import { Pawn } from './pieces/Pawn';
import { Knight } from './pieces/Knight';
import { Queen } from './pieces/Queen';
import { Bishop } from './pieces/Bishop';
import { Rook } from './pieces/Rook';
import { King } from './pieces/King';
import { Move } from './Move';

/**
 * A Game instance,
 * this class stores the current state of the game and
 * the history of the moves done so far.
 *
 * This class serves also as facade for every game operation, all the checks
 * and operations should be done using an instance of Game instead of doing the
 * operations directly on the pieces/tiles.
 *
 * In example, to move a piece, is recommended to use the game.moveTo method rather
 * than the piece.move method.
 */
export class Game {
    /**
     * All the tiles, stored as a plain list.
     */
    public readonly tiles: Tile[] = [];

    /**
     * A map of Piece[].
     * capturedPieces.white includes all the pieces captured so far for the white team.
     * capturedPieces.black includes all the pieces captured so far for the black team.
     */
    public capturedPieces: { white: Piece[], black: Piece[] } = { white: [], black: [] };

    /**
     * The list of moves done so far in the game.
     */
    public readonly movesHistory: Move[] = [];

    /**
     * Creates a new game.
     *
     * @param addPieces: boolean=true, if true initializes the pieces
     * @param createTiles: boolean=true, if true initializes the tiles
     */
    constructor(addPieces: boolean = true, createTiles: boolean = true) {
        if (createTiles) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    this.tiles.push(new Tile(i, j));
                }
            }
        }
        if (createTiles && addPieces) {
            const buildPieces = (team: Team = Team.white) => [
                [
                    new Rook(team),
                    new Knight(team),
                    new Bishop(team),
                    new Queen(team),
                    new King(team),
                    new Bishop(team),
                    new Knight(team),
                    new Rook(team)
                ],
                [
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team),
                    new Pawn(team)
                ]
            ];

            const white = buildPieces(Team.white);
            const black = buildPieces(Team.black);

            white.forEach((row, rowIdx) =>
                row.forEach((piece, pieceIdx) => {
                    const rows = this.rows;
                    rows[rowIdx][pieceIdx].piece = piece;
                })
            );

            black.forEach((row, rowIdx) =>
                row.forEach((piece, pieceIdx) => {
                    const rows = this.rows;
                    rows[7 - rowIdx][pieceIdx].piece = piece;
                })
            );
        }
    }

    /**
     * Returns the tiles organized in rows.
     * @returns Tile[][]
     */
    get rows(): Tile[][] {
        const tilesMap: Tile[][] = new Array<Tile[]>(8);
        this.tiles.forEach((tile) => {
            if (tilesMap[tile.y] === undefined) {
                tilesMap[tile.y] = new Array<Tile>(8);
            }
            tilesMap[tile.y][tile.x] = tile;
        });
        return tilesMap;
    }

    /**
     * Returns a tile given its coords, returns null if no tile is found
     * in the coords passed as parameter.
     * @param coords: number[], the coordinates
     * @returns Piece|null
     */
    getTile(coords: number[]): Tile | null {
        if (this.isInTheGrid(coords)) {
            return this.rows[coords[1]][coords[0]];
        }
        return null;
    }

    /**
     * Returns a piece given its coords, returns null if no piece is found
     * in the coords passed as parameter.
     * @param coords: number[], the coordinates
     * @returns Piece|null
     */
    getPiece(coords: number[]): Piece | null {
        const tile = this.getTile(coords);
        return tile !== null ? tile.piece : null;
    }

    /**
     * Returns true if the coordinates passed as parameter
     * are in the grid, false otherwise.
     * @param coords: number[], the coordinates
     * @returns boolean
     */
    isInTheGrid(coords: number[]): boolean {
        return (
            coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8
        );
    }

    /**
     * Captures a piece.
     * @param piece: Piece, the piece to be captured.
     */
    capturePiece(piece: Piece) {
        this.capturedPieces[piece.team].push(piece);
    }

    /**
     * Returns the list of captured pieces for a team.
     * @param team: Team, 'white' | 'black', please use the Team enum if possible.
     * @returns Piece[]
     */
    getTeamCapturedPieces(team: Team): Piece[] {
        return this.capturedPieces[team];
    }

    /**
     * Returns the list of allowed moves as coordinates for the piece
     * passed as parameter.
     * @param piece:Piece the piece to check the moves for.
     * @returns number[][] a list of coordinates allowed for that piece.
     */
    getAllowedMoves(piece: Piece): number[][] {
        const pieceMoves = piece.moves(this);

        if (this.isInCheck(piece.team)) {
            return pieceMoves.filter(move => {
                const clonedGame = this.simulateMove(piece, move);
                return !clonedGame.isInCheck(piece.team);
            });
        }

        return pieceMoves;
    }

    isAllowedMove(piece: Piece, tile: Tile): boolean {
        const [x, y] = tile.coords;
        return (
            this.getAllowedMoves(piece).find((c) => c[0] === x && c[1] === y) !== undefined
        );
    }

    /**
     * Moves a piece into a Tile if the move is valid.
     * Returns true if the move happened, false otherwise.
     * Adds the move to the history.
     * @param piece: Piece, the piece to be moved
     * @param tile: Tile, the destination tile
     * @returns boolean
     */
    moveTo(piece: Piece, tile: Tile): boolean {
        const startTile = piece.currentTile;
        if (this.isAllowedMove(piece, tile)) {
            piece.move(this, tile);
            this.movesHistory.unshift(new Move(startTile, piece, tile));
            return true;
        }
        return false;
    }

    /**
     * Moves a piece into a Tile without validating the move
     * against the allowed moves.
     *
     * Side effects:
     * - Loses the piece previously assigned to the tile passed as
     * parameter.
     * - Sets as null the piece attribute of the tile the piece passed
     * as parameter is currently assigned to, if any.
     *
     * @param piece: Piece, a piece to be moved
     * @param tile: Tile, a tile to move the piece to
     */
    forceMoveTo(piece: Piece, tile: Tile) {
        const startTile = piece.currentTile;
        if (startTile !== null) {
            startTile.piece = null;
        }
        tile.piece = piece;
        this.movesHistory.unshift(new Move(startTile, piece, tile));
    }

    /**
     * Given a team, returns true if the king is in Check state.
     * Returns false otherwise.
     * @param team: Team, 'white' | 'black', please use the Team enum if possible.
     * @returns boolean
     */
    getKing(team: Team): King | null {
        const tiles = this.tiles.filter(
            (tile: Tile) =>
                tile.piece instanceof King && tile.piece.team === team
        );
        return (tiles.length === 0) ? null : tiles[0].piece as King;
    }

    /**
     * Given a team, returns true if the king is in Check state.
     * Returns false otherwise.
     * @param team: Team, 'white' | 'black', please use the Team enum if possible.
     * @returns boolean
     */
    isInCheck(team: Team): boolean {
        const king = this.getKing(team);
        return (king !== null) ? king.isInCheck(this) : false;
    }

    /**
     * Given a team, returns true if the king is in Check Mate state.
     * Returns false otherwise.
     * @param team: Team, 'white' | 'black', please use the Team enum if possible.
     * @returns boolean
     */
    isInCheckMate(team: Team): boolean {
        const king = this.getKing(team);
        return (king !== null) ? king.isInCheckMate(this) : false;
    }

    /**
     * Given a team, returns true if the last move allows promotion.
     * Returns false otherwise.
     * @param team: Team, 'white' | 'black', please use the Team enum if possible.
     * @returns boolean
     */
    canPromote(team: Team): boolean {
        if (this.movesHistory.length === 0) {
            return false;
        }

        const lastMove = this.movesHistory[0];
        const passedTeamIsTheLastWhoMoved = lastMove.piece.team === team;
        const pieceIsAPawn = lastMove.piece instanceof Pawn;
        const targetTileIsOnLastRank =
            (team === Team.white && lastMove.targetTile.y === 7) ||
            (team === Team.black && lastMove.targetTile.y === 0);
        const passedTeamHasCapturedPieces =
            this.getTeamCapturedPieces(team).length > 0;

        return (passedTeamIsTheLastWhoMoved && pieceIsAPawn && targetTileIsOnLastRank && passedTeamHasCapturedPieces);
    }

    /**
     * Creates a clone of the game.
     * @returns Game
     */
    clone(): Game {
        const clone = new Game(false, false);
        this.tiles.forEach((tile: Tile) => clone.tiles.push(tile.clone()));
        return clone;
    }

    /**
     * Creates a clone of the game and simulates the move using the
     * moveTo method. Returns the cloned game after the move.
     *
     * @param piece: Piece, the piece to be moved
     * @param newCoords: number[], the destination coordinates
     * @returns Game
     */
    simulateMove(piece: Piece, newCoords: number[]): Game {
        const clone = this.clone();
        const clonedPiece = clone.getPiece(piece.currentTile.coords);
        const clonedTile = clone.getTile(newCoords);
        if (clonedPiece === null || clonedTile === null) {
            return clone;
        }
        clone.forceMoveTo(clonedPiece, clonedTile);
        return clone;
    }
}
