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

        const canEnPassant = this.canEnPassant(game);
        const enPassantCoords = this.getEnPassantTile(game)?.coords;

        if (canEnPassant && enPassantCoords) {
            moves.push(enPassantCoords);
        }

        return moves;
    }

    move(game: Game, tile: Tile): boolean {
        return (this.canEnPassant(game)) ? this.enPassant(game, tile) : super.move(game, tile);
    }

    canEnPassant(game: Game) {
        if (game.history.length === 0) return false;
        const lastMove = game.history[0];
        return lastMove.isEnPassant() &&
            lastMove.targetTile.coords[1] === this.currentTile.coords[1] &&
            Math.abs(lastMove.targetTile.coords[0] - this.currentTile.coords[0]) === 1
    }

    getEnPassantTile(game: Game): Tile | null {
        if (game.history.length === 0) return null;
        const lastMove = game.history[0];
        const distance = lastMove.targetTile.coords[1] - lastMove.startTile.coords[1];
        if (distance === 0) return null;
        const sign = distance / Math.abs(distance);

        const tileCoords = [
            lastMove.targetTile.coords[0],
            lastMove.targetTile.coords[1] - sign
        ];
        return game.getTile(tileCoords);
    }

    getEnPassantPiece(game: Game): Piece | null {
        if (game.history.length === 0) return null;
        const lastMove = game.history[0];
        return lastMove.piece;
    }

    enPassant(game: Game, tile: Tile): boolean {
        const moved = super.move(game, tile);
        const enPassantPiece = this.getEnPassantPiece(game);
        if (enPassantPiece !== null) {
            enPassantPiece.currentTile.piece = null;
            game.capturePiece(enPassantPiece)
        }
        return moved;
    }
}