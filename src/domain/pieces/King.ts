import {Game} from "../Game";
import {Directions, Piece} from "../Piece";

export class King extends Piece {
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
        directions.forEach((direction) => moves = moves.concat(this.sweepDirection(game, direction, 1)));
        return moves;
    }

    get icon(): string {
        return "chess-king"
    }

    get label(): string {
        return "K";
    }
}