import {areEqual, buildGame, toAllowedMoves} from "../utils";

describe('A Knight', () => {
    it('should be able to move any number of squares along a rank or file', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "__", "wk", "__", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKnight = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKnight?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to take the place of another piece from the same team', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "wp", "__", "wp", "AM", "__"],
            ["__", "__", "__", "__", "wk", "__", "__", "__"],
            ["__", "__", "AM", "wp", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "wp", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKnight = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);

        const calculatedMoves = aKnight?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to leap over other pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "wp", "__", "wp", "AM", "__"],
            ["__", "__", "__", "__", "wk", "__", "__", "__"],
            ["__", "__", "AM", "wp", "__", "wp", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKnight = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);

        const calculatedMoves = aKnight?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture but and leap over other enemy pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "bp", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wk", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "bp", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKnight = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);

        const calculatedMoves = aKnight?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
})
