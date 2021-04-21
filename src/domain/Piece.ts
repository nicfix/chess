import {Game} from "./Game";
import {Tile} from "./Tile";

export enum Team {
    white = 'white',
    black = 'black'
}

export class Directions {
    public static N = [0, 1];
    public static NE = [1, 1];
    public static E = [1, 0];
    public static SE = [1, -1];
    public static S = [0, -1];
    public static SW = [-1, -1];
    public static W = [-1, 0];
    public static NW = [-1, 1];

}

export class Piece {

    public currentTile: Tile = new Tile(0, 0);
    private _movesCount: number = 0;

    constructor(readonly team: Team) {
    }

    get label(): string {
        return "";
    };

    get icon(): string {
        return "chess"
    }

    moves(game: Game): number[][] {
        return []
    };

    isLegalMove(game: Game, tile: Tile): boolean {
        const [x, y] = tile.coords;
        return this.moves(game).find(c => c[0] === x && c[1] === y) !== undefined;
    }

    capture(game: Game, tile: Tile): boolean {
        if (this.isLegalMove(game, tile) && tile.piece !== null) {

            this.move(game, tile);
            return true;
        }
        return false;
    }

    move(game: Game, tile: Tile): boolean {
        if (this.isLegalMove(game, tile)) {
            if (tile.piece !== null) {
                game.capturePiece(tile.piece);
            }
            this.currentTile.piece = null;
            tile.piece = this;
            this._movesCount += 1;
            return true;
        }
        return false;
    }

    sweepDirection(game: Game, direction: number[], maxDistance: number = 999, canEatInThisDirection: boolean = true): number[][] {
        let i = 1;
        let collision = false;
        let isInTheGrid = game.isInTheGrid(this.currentTile.coords);
        const moves: any = {};

        while (!collision && i < maxDistance + 1 && isInTheGrid) {
            const [x, y] = [this.currentTile.coords[0] + direction[0] * i, this.currentTile.coords[1] + direction[1] * i];
            const isInTheGrid = game.isInTheGrid([x, y]);

            if (isInTheGrid) {
                const piece = game.getTile([x, y])?.piece;
                collision = piece !== null;
                if (!collision) {
                    moves[`${x},${y}`] = [x, y];
                }

                if (piece?.team !== this.team && canEatInThisDirection) {
                    moves[`${x},${y}`] = [x, y];
                }
            }

            i++;
        }
        return Object.values(moves);
    }

    get movesCount(): number {
        return this._movesCount;
    }
}

