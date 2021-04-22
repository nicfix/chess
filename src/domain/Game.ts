import {Piece, Team} from "./Piece";
import {Tile} from "./Tile";
import {Pawn} from "./pieces/Pawn";
import {Knight} from "./pieces/Knight";
import {Queen} from "./pieces/Queen";
import {Bishop} from "./pieces/Bishop";
import {Rook} from "./pieces/Rook";
import {King} from "./pieces/King";
import {Move} from "./Move";

export class Game {
    public readonly tiles: Tile[] = [];
    public capturedPieces: any = {'white': [], 'black': []};
    public readonly pieces: any = {'white': [], 'black': []};

    public readonly history: Move[] = [];

    constructor(addPieces: boolean = true) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.tiles.push(
                    new Tile(i, j)
                )
            }
        }

        if (addPieces) {
            const buildPieces = (team: Team = Team.white) => [
                [new Rook(team), new Knight(team), new Bishop(team), new Queen(team), new King(team), new Bishop(team), new Knight(team), new Rook(team)],
                [new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team),]
            ]

            const white = buildPieces(Team.white);
            const black = buildPieces(Team.black);

            white.forEach((row, rowIdx) => row.forEach((piece, pieceIdx) => {
                const rows = this.rows;
                rows[rowIdx][pieceIdx].piece = piece;
            }))

            black.forEach((row, rowIdx) => row.forEach((piece, pieceIdx) => {
                const rows = this.rows;
                rows[7 - rowIdx][pieceIdx].piece = piece;
            }))
        }
    }

    get rows(): Tile[][] {
        const tilesMap: Tile[][] = [];
        this.tiles.forEach(tile => {
                if (tilesMap.length < tile.y + 1) {
                    tilesMap.push([]);
                }
                tilesMap[tile.y].push(tile);
            }
        )
        return tilesMap;
    }

    getTile(coords: number[]): Tile | null {
        if (this.isInTheGrid(coords)) {
            return this.rows[coords[1]][coords[0]];
        }
        return null;
    }

    getPiece(coords: number[]): Piece | null {
        const tile = this.getTile(coords);
        return (tile !== null) ? tile.piece : null;
    }

    isInTheGrid(coords: number[]) {
        return coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8
    }

    capturePiece(piece: Piece) {
        this.capturedPieces[piece.team].push(piece);
    }

    getTeamCapturedPieces(team: Team) {
        return this.capturedPieces[team];
    }

    moveTo(piece: Piece, tile: Tile): boolean {
        const startTile = piece.currentTile;
        const didMove = piece.move(this, tile);
        if (didMove) {
            this.history.unshift(
                new Move(startTile, piece, tile)
            )
        }
        return didMove;
    }

    forceMoveTo(piece: Piece, tile: Tile) {
        const rookStart = piece.currentTile;
        tile.piece = piece;
        piece.currentTile = tile;
        rookStart.piece = null;
        this.history.unshift(new Move(rookStart, piece, tile));
    }
}