import {Game, Pawn, Rook, Team} from "./Game"

const isIn = (coordsArray: number[][], coords: number[]) => {
    return coordsArray.find(x => x[0] === coords[0] && x[1] === coords[1]) !== undefined;
}

describe('A Rook', () => {
    const aGame = new Game(false);
    const aTile = aGame.getTile([4, 4]);
    const aRook = new Rook(Team.white);
    if (aTile !== null) {
        aTile.piece = aRook;
    }

    it('should be able to move in 4 directions in an empty game', () => {
        const expectedMoves: number[][] = [];
        for (let i = 0; i < 8; i++) {
            if (i !== 4) {
                expectedMoves.push([i, 4])
                expectedMoves.push([4, i])
            }
        }

        const calculatedMoves = aRook.moves(aGame);

        calculatedMoves.forEach(
            coord => {
                expect(isIn(expectedMoves, coord)).toBeTruthy();
            }
        );

        expect(calculatedMoves.length).toBe(expectedMoves.length);
    });

    it('should be able to move in one direction only until a collision with another piece from the same team', () => {
        const anotherTile = aGame.getTile([4, 6]);
        if (anotherTile !== null) {
            anotherTile.piece = new Pawn(Team.white);
            const calculatedMoves = aRook.moves(aGame);
            expect(isIn(calculatedMoves, [4, 5])).toBe(true);
            expect(isIn(calculatedMoves, [4, 6])).toBe(false);
            expect(isIn(calculatedMoves, [4, 7])).toBe(false);
        }
    });

    it('should be able to move in one direction only until a collision ' +
        'with another piece from the opposite team', () => {
        const anotherTile = aGame.getTile([4, 2]);
        if (anotherTile !== null) {
            anotherTile.piece = new Pawn(Team.black);
            const calculatedMoves = aRook.moves(aGame);
            expect(isIn(calculatedMoves, [4, 3])).toBe(true);
            expect(isIn(calculatedMoves, [4, 2])).toBe(true);
            expect(isIn(calculatedMoves, [4, 1])).toBe(false);
            expect(isIn(calculatedMoves, [4, 0])).toBe(false);
        }
    });
})