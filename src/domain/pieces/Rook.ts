import {Game} from "../Game";
import {Directions, Piece} from "../Piece";

export class Rook extends Piece {
    moves(game: Game): number[][] {
        let moves: number[][] = [];
        const directions = [
            Directions.N,
            Directions.E,
            Directions.S,
            Directions.W,
        ]
        directions.forEach((direction) => moves = moves.concat(this.sweepDirection(game, direction)));
        return moves;
    }

    get label(): string {
        return "r";
    }

    get icon(): string {
        return "chess-rook"
    }
}