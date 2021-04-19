import {areEqual, buildGame, isIn, toAllowedMoves} from "../utils";

describe('A Pawn', () => {
    it('should be able to move two squares forward at the first move', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aPawn = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aPawn?.moves(aGame) || [];

        calculatedMoves.forEach(
            coord => {
                expect(isIn(expectedMoves, coord)).toBeTruthy();
            }
        );

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to move one square forward from the second move one', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aPawn = aGame.getPiece([4, 4]);
        const firstMoveTile = aGame.getTile([4, 5]);
        //@ts-ignore
        aGame.moveTo(aPawn, firstMoveTile);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aPawn?.moves(aGame) || [];

        calculatedMoves.forEach(
            coord => {
                expect(isIn(expectedMoves, coord)).toBeTruthy();
            }
        );

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to leap over other pieces', () => {

        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aPawn = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aPawn?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture enemies one square diagonally', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "bp", "__", "bp", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]

        const expectedAllowedMoves = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["__", "__", "__", "__", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]
        const aGame = buildGame(expectedGameMap);
        const aPawn = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedAllowedMoves);
        const calculatedMoves = aPawn?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to capture an enemy en-passant', () => {
        // https://it.wikipedia.org/wiki/En_passant
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "wp", "__", "__", "__"],
            ["__", "__", "__", "__", "AM", "AM", "__", "__"],
            ["__", "__", "__", "__", "AM", "bp", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ]


        const aGame = buildGame(expectedGameMap);

        const enPassantPawn = aGame.getTile([5, 6])?.piece || null;
        const enPassantTile = aGame.getTile([5, 4]);

        // @ts-ignore
        aGame.moveTo(enPassantPawn, enPassantTile);

        const aPawn = aGame.getPiece([4, 4]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aPawn?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });
})