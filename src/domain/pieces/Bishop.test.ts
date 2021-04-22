import {areEqual, buildGame, toAllowedMoves} from "../utils";

describe('A Bishop', () => {
    it('should be able to move any number of squares diagonally', () => {
        const expectedGameMap = [
            ["AM", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "AM", "__", "__", "__", "__", "__", "AM"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "wb", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "AM", "__", "__", "__", "__", "__", "AM"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aBishop = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aBishop?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to leap over other pieces', () => {
        const expectedGameMap = [
            ["AM", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "AM", "__", "__", "__", "__", "__", "AM"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "wb", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "wp", "__"],
            ["__", "AM", "__", "__", "__", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aBishop = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aBishop?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture but not leap over other enemy pieces', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "bp", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wb", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "AM"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "__", "AM", "__", "__"],
            ["__", "__", "AM", "__", "__", "__", "AM", "__"],
            ["__", "AM", "__", "__", "__", "__", "__", "AM"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aBishop = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);
        const calculatedMoves = aBishop?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
})
