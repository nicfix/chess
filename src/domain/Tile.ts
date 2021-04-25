import { Piece } from './Piece';

export class Tile {
    private _piece: Piece | null = null;

    constructor(readonly x: number, readonly y: number) {}

    get coords(): [number, number] {
        return [this.x, this.y];
    }

    set piece(piece: Piece | null) {
        this._piece = piece;
        if (piece !== null) {
            piece.currentTile = this;
        }
    }

    get piece(): Piece | null {
        return this._piece;
    }

    get coordsLabels(): [string, number] {
        const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return [labels[this.x], this.y + 1];
    }

    clone(): Tile {
        const clone = new Tile(this.x, this.y);
        clone.piece = this.piece?.clone() || null;
        return clone;
    }
}
