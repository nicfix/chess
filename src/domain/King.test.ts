import {areEqual, buildGame, toAllowedMoves} from "./utils";

describe('A King', () => {
    it('should be able to move any number of squares along a rank or file', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "__", "AM", "wK", "AM", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to leap over other pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "wp", "__", "__"],
            ["__", "__", "__", "AM", "wK", "AM", "__", "__"],
            ["__", "__", "__", "wp", "AM", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);

        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture but and leap over other enemy pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wK", "__", "__", "__"],
            ["__", "__", "__", "bp", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);

        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
})
