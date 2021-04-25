import {areEqual, buildGame, toAllowedMoves} from "../utils";

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

    it('should be in check if any of the other pieces can capture it', () => {
        const expectedGameMap = [
            ["__", "__", "__", "wK", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "bq", "", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);


        // @ts-ignore
        expect(aKing.isInCheck(aGame)).toBeTruthy();
    });

    it('should be able to do the "queen" castling', () => {
        const expectedGameMap = [
            ["__", "__", "AM", "wK", "AM", "AM", "__", "wr"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to do the "king" castling', () => {
        const expectedGameMap = [
            ["wr", "AM", "AM", "wK", "AM", "__", "__", "__"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to do the castling', () => {
        const expectedGameMap = [
            ["wr", "AM", "AM", "wK", "AM", "AM", "__", "wr"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to do the castling if is in check', () => {
        const expectedGameMap = [
            ["wr", "__", "AM", "wK", "AM", "__", "__", "wr"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "bq", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not be able to do the castling if the rook already moved', () => {
        const expectedGameMap = [
            ["wr", "AM", "AM", "wK", "AM", "__", "__", "wr"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);
        const aRook = aGame.getPiece([7, 0]);

        // @ts-ignore
        aGame.moveTo(aRook, aGame.getTile([7, 1]));
        // @ts-ignore
        aGame.moveTo(aRook, aGame.getTile([7, 0]));

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to do the castling on the black side', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["br", "__", "AM", "AM", "bK", "AM", "AM", "br"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 7]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should be able to do the castling if there\'s a piece between the king and the rook', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["br", "bk", "__", "AM", "bK", "AM", "bk", "br"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 7]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('should not go in a loop with two kings on the board', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "wK", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "AM", "AM", "AM", "__", "__"],
            ["br", "bk", "__", "AM", "bK", "AM", "bk", "br"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 7]);

        const expectedMoves = toAllowedMoves(expectedGameMap);
        const calculatedMoves = aKing?.moves(aGame) || [];

        expect(areEqual(expectedMoves, calculatedMoves)).toBeTruthy();
    });

    it('also the king can check', () => {
        const expectedGameMap = [
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "wK", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "bK", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([4, 7]);

        // @ts-ignore
        expect(aKing.isInCheck(aGame)).toBeTruthy();
    });

    it('a castling move should move the rook', () => {
        const expectedGameMap = [
            ["wr", "AM", "AM", "wK", "AM", "__", "__", "wr"],
            ["__", "__", "AM", "AM", "AM", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([3, 0]);
        const aRook = aGame.getPiece([0, 0]);

        // @ts-ignore
        aGame.moveTo(aKing, aGame.getTile([1, 0]));


        expect(aKing?.currentTile.coords).toStrictEqual([1, 0]);
        expect(aRook?.currentTile.coords).toStrictEqual([2, 0]);
    });

    it('should be able to detect check mate', () => {
        const expectedGameMap = [
            ["wK", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["bK", "__", "bb", "bb", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([0, 0]);


        // @ts-ignore
        expect(aKing.isInCheckMate(aGame)).toBeTruthy();
    });

    it('should be able to detect if another piece can save him from check mate', () => {
        // The knight can move between the black rook and the white King
        const expectedGameMap = [
            ["wK", "wk", "__", "__", "__", "__", "__", "__"],
            ["__", "wp", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["br", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([0, 0]);


        // @ts-ignore
        expect(aKing.isInCheckMate(aGame)).toBeFalsy();
    });

    it('should be able to detect the king can save himself from check mate', () => {
        // The knight can move between the black rook and the white King
        const expectedGameMap = [
            ["wK", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["__", "__", "__", "__", "__", "__", "__", "__"],
            ["br", "__", "__", "__", "__", "__", "__", "__"]
        ];
        const aGame = buildGame(expectedGameMap);
        const aKing = aGame.getPiece([0, 0]);


        // @ts-ignore
        expect(aKing.isInCheckMate(aGame)).toBeFalsy();
    });

});
