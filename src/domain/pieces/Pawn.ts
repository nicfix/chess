import {Game} from "../Game";
import {Directions, Piece, Team} from "../Piece";

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

        const isInTheGrid = (coords: number[]) => {
            return coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8
        }

        const rightDiagonal = [x + 1, y + sign];
        if (isInTheGrid(rightDiagonal)) {
            const rightDiagonalPiece = game.getTile(rightDiagonal)?.piece;
            if (rightDiagonalPiece !== null && rightDiagonalPiece?.team !== this.team) {
                moves.push(rightDiagonal)
            }
        }

        const leftDiagonal = [x - 1, y + sign];
        if (isInTheGrid(leftDiagonal)) {
            const leftDiagonalPiece = game.getTile(leftDiagonal)?.piece;
            if (leftDiagonalPiece !== null && leftDiagonalPiece?.team !== this.team) {
                moves.push(leftDiagonal)
            }
        }

        return moves;
    }
}