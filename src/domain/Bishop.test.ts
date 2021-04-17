import {Bishop, Game, Pawn, Team} from "./Game"

const isIn = (coordsArray: number[][], coords: number[]) => {
    return coordsArray.find(x => x[0] === coords[0] && x[1] === coords[1]) !== undefined;
}

describe('A Bishop', () => {
    const aGame = new Game(false);
    const aTile = aGame.getTile([4, 4]);
    const aBishop = new Bishop(Team.white);
    if (aTile !== null) {
        aTile.piece = aBishop;
    }

    it('should be able to move in 4 directions in an empty game', () => {
        let expectedMoves: number[][] = [];
        for (let i = 0; i < 8; i++) {
            if (i !== 4) {
                expectedMoves.push([i, i])
                const reverseDiagonalCoords = [7 - i + 1, i];
                if (aGame.isInTheGrid(reverseDiagonalCoords)) {
                    expectedMoves.push(reverseDiagonalCoords);
                }
            }
        }

        expectedMoves = [...new Set(expectedMoves)];

        const calculatedMoves = aBishop.moves(aGame);

        calculatedMoves.forEach(
            coord => {
                expect(isIn(expectedMoves, coord)).toBeTruthy();
            }
        );

        expect(calculatedMoves.length).toBe(expectedMoves.length);
    });

    it('should be able to move in one direction only until a collision with another piece from the same team', () => {
        const anotherTile = aGame.getTile([6, 6]);
        if (anotherTile !== null) {
            anotherTile.piece = new Pawn(Team.white);
            const calculatedMoves = aBishop.moves(aGame);
            expect(isIn(calculatedMoves, [5, 5])).toBe(true);
            expect(isIn(calculatedMoves, [6, 6])).toBe(false);
            expect(isIn(calculatedMoves, [7, 7])).toBe(false);
        }
    });

    it('should be able to move in one direction only until a collision ' +
        'with another piece from the opposite team', () => {
        const anotherTile = aGame.getTile([2, 2]);
        if (anotherTile !== null) {
            anotherTile.piece = new Pawn(Team.black);
            const calculatedMoves = aBishop.moves(aGame);
            expect(isIn(calculatedMoves, [3, 3])).toBe(true);
            expect(isIn(calculatedMoves, [2, 2])).toBe(true);
            expect(isIn(calculatedMoves, [1, 1])).toBe(false);
            expect(isIn(calculatedMoves, [0, 0])).toBe(false);
        }
    });
})