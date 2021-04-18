import {areEqual, buildGame, toAllowedMoves} from "../utils";

describe('A Queen', () => {
    it('should be able to move any number of squares along a rank or file and any number of squares diagonally', () => {
        const expectedGameMap = [
            ["AM", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "AM", "__", "__", "AM", "__", "__", "AM"],
            ["__", "__", "AM", "__", "AM", "__", "AM", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["AM", "AM", "AM", "AM", "wq", "AM", "AM", "AM"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "AM", "__", "AM", "__", "AM", "__"],
            ["__", "AM", "__", "__", "AM", "__", "__", "AM"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aQueen = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aQueen?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to leap over other pieces', () => {
        const expectedGameMap = [
            ["AM", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "AM", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "AM", "__", "AM", "__", "wp", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "wp", "AM", "AM", "wq", "AM", "AM", "AM"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "AM", "__", "AM", "__", "AM", "__"],
            ["__", "AM", "__", "__", "AM", "__", "__", "AM"]
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
            ["__", "__", "__", "__", "wq", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "AM"],
            ["__", "__", "AM", "__", "AM", "__", "AM", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["AM", "AM", "AM", "AM", "__", "AM", "AM", "AM"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "AM", "__", "AM", "__", "AM", "__"],
            ["__", "AM", "__", "__", "AM", "__", "__", "AM"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aBishop = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);
        const calculatedMoves = aBishop?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
});