import {areEqual, buildGame, isIn, toAllowedMoves} from "./utils";

describe('A Rook', () => {
    it('should be able to move any number of squares along a rank or file', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["AM", "AM", "AM", "AM", "wr", "AM", "AM", "AM"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aRook = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aRook?.moves(aGame) || [];

        calculatedMoves.forEach(
            coord => {
                expect(isIn(expectedMoves, coord)).toBeTruthy();
            }
        );

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to leap over other pieces', () => {

        const expectedGameMap = [
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "wp", "AM", "wr", "AM", "AM", "AM"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aRook = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aRook?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture but not leap over other enemy pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "bp", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wr", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["AM", "AM", "AM", "AM", "__", "AM", "AM", "AM"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aRook = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);
        const calculatedMoves = aRook?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
})