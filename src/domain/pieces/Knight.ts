import {Game} from "../Game";
import {Piece} from "../Piece";

export class Knight extends Piece {
    get label(): string {
        return "k";
    }

    get icon(): string {
        return "chess-knight"
    }

    moves(game: Game): number[][] {
        const [x, y] = this.currentTile.coords;
        return [
            [x + 2, y + 1],
            [x + 1, y + 2],
            [x - 2, y + 1],
            [x - 1, y + 2],
            [x + 2, y - 1],
            [x + 1, y - 2],
            [x - 2, y - 1],
            [x - 1, y - 2],
        ].filter(coords => game.getTile(coords)?.piece == null || game.getTile(coords)?.piece?.team !== this.team);

    }
}