import {Game} from "../Game";
import {Directions, Piece} from "../Piece";

export class Queen extends Piece {
    get label(): string {
        return "q";
    }

    get icon(): string {
        return "chess-queen"
    }

    moves(game: Game): number[][] {
        let moves: number[][] = [];
        const directions = [
            Directions.N,
            Directions.NE,
            Directions.E,
            Directions.SE,
            Directions.S,
            Directions.SW,
            Directions.W,
            Directions.NW
        ];
        directions.forEach((direction) => moves = moves.concat(this.sweepDirection(game, direction)));
        return moves;
    }
}