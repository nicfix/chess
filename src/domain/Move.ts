import {Tile} from "./Tile";
import {Piece} from "./Piece";
import {Pawn} from "./pieces/Pawn";

export class Move {
    constructor(
        public readonly startTile: Tile,
        public readonly piece: Piece,
        public readonly targetTile: Tile
    ) {
    }

    isEnPassant() {
        const moveDistance = Math.abs(this.targetTile.coords[1] - this.startTile.coords[1]);
        return moveDistance === 2 && (this.piece instanceof Pawn);
    }
}