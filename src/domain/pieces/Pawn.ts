import {Game} from "../Game";
import {Directions, Piece, Team} from "../Piece";
import {Tile} from "../Tile";

export class Pawn extends Piece {
    get label(): string {
        return "p";
    }

    get icon(): string {
        return "chess-pawn"
    }

    moves(game: Game): number[][] {
        const sign = this.team === Team.white ? 1 : -1;
        const forwardDirection = this.team === Team.white ? Directions.N : Directions.S;
        const max = this.movesCount === 0 ? 2 : 1;

        const [x, y] = this.currentTile.coords;
        const moves = this.sweepDirection(game, forwardDirection, max, false);

        const rightDiagonal = [x + 1, y + sign];
        if (game.isInTheGrid(rightDiagonal)) {
            const rightDiagonalPiece = game.getTile(rightDiagonal)?.piece;
            if (rightDiagonalPiece !== null && rightDiagonalPiece?.team !== this.team) {
                moves.push(rightDiagonal)
            }
        }

        const leftDiagonal = [x - 1, y + sign];
        if (game.isInTheGrid(leftDiagonal)) {
            const leftDiagonalPiece = game.getTile(leftDiagonal)?.piece;
            if (leftDiagonalPiece !== null && leftDiagonalPiece?.team !== this.team) {
                moves.push(leftDiagonal)
            }
        }

        if (game.enPassantTile !== null &&
            game.enPassantPiece !== null &&
            game.enPassantPiece.team !== this.team &&
            game.enPassantPiece.currentTile.coords[1] === this.currentTile.coords[1] &&
            Math.abs(game.enPassantPiece.currentTile.coords[0] - this.currentTile.coords[0]) === 1
        ) {
            moves.push(game.enPassantTile.coords);
        }

        return moves;
    }

    move(game: Game, tile: Tile): boolean {
        const originalTile = this.currentTile;
        const moved = (tile === game.enPassantTile) ? this.enPassant(game, tile) : super.move(game, tile);
        const movement = tile.coords[1] - originalTile.coords[1];
        const distance = Math.abs(movement);


        if (distance === 2 && moved) {
            // With this move, the piece is the new en-passant potential victim
            const sign = movement / distance;
            const enPassantTileCoords = [originalTile.coords[0], originalTile.coords[1] + sign];
            game.enPassantTile = game.getTile(enPassantTileCoords);
            game.enPassantPiece = this;
        }

        return moved;
    }

    enPassant(game: Game, tile: Tile): boolean {
        const enPassantPiece = game.enPassantPiece;
        const moved = super.move(game, tile);
        if (enPassantPiece !== null) {
            enPassantPiece.currentTile.piece = null;
            game.capturePiece(enPassantPiece)
        }
        return moved;
    }
}