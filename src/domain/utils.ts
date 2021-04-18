import {Bishop, Game, King, Knight, Pawn, Queen, Rook, Team} from "./Game";

export const toAllowedMoves: (gameMap: string[][]) => number[][] = (gameMap: string[][]) => {
    const expectedMoves: number[][] = [];

    gameMap.forEach(
        (rank, rankIdx) => rank.forEach(
            (file, fileIdx) => {
                if (file === "AM") {
                    expectedMoves.push([fileIdx, rankIdx]);
                }
            }));
    return expectedMoves;
}

export const placePieces: (gameMap: string[][], aGame: Game) => void = (gameMap, aGame) => {
    const piecesMap: any = {
        'wp': () => new Pawn(Team.white),
        'wk': () => new Knight(Team.white),
        'wq': () => new Queen(Team.white),
        'wK': () => new King(Team.white),
        'wb': () => new Bishop(Team.white),
        'wr': () => new Rook(Team.white),
        'bp': () => new Pawn(Team.black),
        'bk': () => new Knight(Team.black),
        'bq': () => new Queen(Team.black),
        'bK': () => new King(Team.black),
        'bb': () => new Bishop(Team.black),
        'br': () => new Rook(Team.black)
    };

    gameMap.forEach(
        (rank, rankIdx) => rank.forEach(
            (file, fileIdx) => {
                const coords = [fileIdx, rankIdx];
                if (piecesMap.hasOwnProperty(file) && aGame.isInTheGrid(coords)) {
                    const anotherTile = aGame.getTile(coords);
                    if (anotherTile !== null) {
                        anotherTile.piece = piecesMap[file]();
                    }
                }
            }));
}

export const areEqual: (expectedMoves: number[][], moves: number[][]) => boolean = (expectedMoves, moves) => {
    let isValid = true;

    expectedMoves.forEach(
        coord => {
            isValid = isValid && isIn(moves, coord);
        }
    );
    return isValid && moves.length === expectedMoves.length;
}

export const buildGame: (gameMap: string[][]) => Game = (gameMap) => {
    const aGame = new Game(false);
    placePieces(gameMap, aGame);
    return aGame;
}


export const isIn = (coordsArray: number[][], coords: number[]) => {
    return coordsArray.find(x => x[0] === coords[0] && x[1] === coords[1]) !== undefined;
}