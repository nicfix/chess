import { Game } from '../Game';
import { Directions, Piece } from '../Piece';

export class Bishop extends Piece {
    get label(): string {
        return 'b';
    }

    get icon(): string {
        return 'chess-bishop';
    }

    moves(game: Game): number[][] {
        let moves: number[][] = [];
        const directions = [
            Directions.NE,
            Directions.SE,
            Directions.SW,
            Directions.NW,
        ];
        directions.forEach(
            (direction) =>
                (moves = moves.concat(this.sweepDirection(game, direction)))
        );
        return moves;
    }

    clone(): Piece {
        return new Bishop(this.team, this.movesCount);
    }
}
