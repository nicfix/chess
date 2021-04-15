export enum Team {
    white = 'white',
    black = 'black'
}

class Directions {
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

    eat(game: Game, tile: Tile): boolean {
        if (this.isLegalMove(game, tile) && tile.piece !== null) {
            game.capturePiece(tile.piece);
            this.move(game, tile);
            return true;
        }
        return false;
    }

    move(game: Game, tile: Tile): boolean {
        if (this.isLegalMove(game, tile)) {
            this.currentTile.piece = null;
            tile.piece = this;
            this._movesCount += 1;
            return true;
        }

        return false;
    }

    sweepDirection(game: Game, direction: number[], max: number = 7, canEatInThisDirection: boolean = true): number[][] {
        let i = 1;
        let collision = false;
        const moves: number[][] = [];

        while (!collision && i < max + 1) {
            const [x, y] = [this.currentTile.coords[0] + direction[0] * i, this.currentTile.coords[1] + direction[1] * i];
            console.log(`checking ${[x, y]}`);
            if (game.isInTheGrid([x, y])) {
                const piece = game.getTile([x, y]).piece;
                collision = piece !== null;
                if (!collision) {
                    moves.push([x, y]);
                }

                if (piece?.team !== this.team && canEatInThisDirection) {
                    moves.push([x, y]);
                }
            }
            i++;
        }

        console.log(moves);
        return moves;
    }

    get movesCount(): number {
        return this._movesCount;
    }
}

class Pawn extends Piece {
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
            const rightDiagonalPiece = game.getTile(rightDiagonal).piece;
            if (rightDiagonalPiece !== null && rightDiagonalPiece.team !== this.team) {
                moves.push(rightDiagonal)
            }
        }

        const leftDiagonal = [x - 1, y + sign];
        if (isInTheGrid(leftDiagonal)) {
            const leftDiagonalPiece = game.getTile(leftDiagonal).piece;
            if (leftDiagonalPiece !== null && leftDiagonalPiece.team !== this.team) {
                moves.push(leftDiagonal)
            }
        }

        return moves;
    }
}

class Knight extends Piece {
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
        ];
    }
}

class Queen extends Piece {
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

class Bishop extends Piece {
    get label(): string {
        return "b";
    }

    get icon(): string {
        return "chess-bishop"
    }

    moves(game: Game): number[][] {
        let moves: number[][] = [];
        const directions = [
            Directions.NE,
            Directions.SE,
            Directions.SW,
            Directions.NW,
        ]
        directions.forEach((direction) => moves = moves.concat(this.sweepDirection(game, direction)));
        return moves;
    }
}

class Rook extends Piece {
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

class King extends Piece {
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

export class Tile {
    private _piece: Piece | null = null;

    constructor(
        readonly x: number,
        readonly y: number
    ) {
    }

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
        const labels = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
        ]
        return [labels[this.x], this.y + 1]
    }
}

export class Game {
    public readonly tiles: Tile[] = [];
    public capturedPieces: any = {'white': [], 'black': []};

    constructor() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.tiles.push(
                    new Tile(i, j)
                )
            }
        }

        const buildPieces = (team: Team = Team.white) => [
            [new Rook(team), new Knight(team), new Bishop(team), new Queen(team), new King(team), new Bishop(team), new Knight(team), new Rook(team)],
            [new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team), new Pawn(team),]
        ]

        const white = buildPieces(Team.white);
        const black = buildPieces(Team.black);

        white.forEach((row, rowIdx) => row.forEach((piece, pieceIdx) => {
            const rows = this.rows;
            rows[rowIdx][pieceIdx].piece = piece;
        }))

        black.forEach((row, rowIdx) => row.forEach((piece, pieceIdx) => {
            const rows = this.rows;
            rows[7 - rowIdx][pieceIdx].piece = piece;
        }))
    }

    get rows(): Tile[][] {
        const tilesMap: Tile[][] = [];
        this.tiles.forEach(tile => {
                if (tilesMap.length < tile.y + 1) {
                    tilesMap.push([]);
                }
                tilesMap[tile.y].push(tile);
            }
        )
        return tilesMap;
    }

    getTile(coords: number[]): Tile {
        return this.rows[coords[1]][coords[0]];
    }

    isInTheGrid(coords: number[]) {
        return coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8
    }

    capturePiece(piece: Piece) {
        this.capturedPieces[piece.team].push(piece);
    }

    getTeamCapturedPieces(team: Team) {
        return this.capturedPieces[team];
    }

}