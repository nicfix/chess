import {Bishop, Game, King, Knight, Pawn, Queen, Rook, Team, Tile} from './Game';


describe('A Game', () => {
    const aGame = new Game();
    it('should have 64 tiles', () => {
        expect(aGame.tiles.length).toBe(64);
    });

    it('should have 16 white pieces', () => {
        expect(aGame.tiles.filter(t => t.piece?.team === Team.white).length).toBe(16)
    });

    it('should have 16 white pieces', () => {
        expect(aGame.tiles.filter(t => t.piece?.team === Team.black).length).toBe(16)
    });

    it('should have 8 white pawns', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Pawn && t.piece?.team === Team.white).length).toBe(8)
    });

    it('should have 2 white rooks', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Rook && t.piece?.team === Team.white).length).toBe(2)
    });

    it('should have 2 white knights', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Knight && t.piece?.team === Team.white).length).toBe(2)
    });

    it('should have 2 white bishops', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Bishop && t.piece?.team === Team.white).length).toBe(2)
    });

    it('should have a white queen', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Queen && t.piece?.team === Team.white).length).toBe(1)
    });

    it('should have a white king', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof King && t.piece?.team === Team.white).length).toBe(1)
    });

    it('should have 8 black pawns', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Pawn && t.piece?.team === Team.black).length).toBe(8)
    });

    it('should have 2 black rooks', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Rook && t.piece?.team === Team.black).length).toBe(2)
    });

    it('should have 2 black knights', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Knight && t.piece?.team === Team.black).length).toBe(2)
    });

    it('should have 2 black bishops', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Bishop && t.piece?.team === Team.black).length).toBe(2)
    });

    it('should have a black queen', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof Queen && t.piece?.team === Team.black).length).toBe(1)
    });

    it('should have a black king', () => {
        expect(aGame.tiles.filter(t => t.piece instanceof King && t.piece?.team === Team.black).length).toBe(1)
    });

    it('should return false if isInTheGrid is called with coords outside the grid', () => {
        const someCoords = [9, 10];
        expect(aGame.isInTheGrid(someCoords)).toBe(false);

        const negativeCoords = [-1, -2];
        expect(aGame.isInTheGrid(negativeCoords)).toBe(false);
    });

    it('should return true if isInTheGrid is called with coords inside the grid', () => {
        const someCoords = [7, 7];
        expect(aGame.isInTheGrid(someCoords)).toBe(true);

        const otherCoords = [7, 7];
        expect(aGame.isInTheGrid(otherCoords)).toBe(true);
    });

    it('should return a tile for coordinates that are in the grid', () => {
        const coords = [5, 5];
        expect(aGame.getTile(coords)).toBeInstanceOf(Tile);
    });

    it('should return null for coordinates that are not in the grid', () => {
        const someCoords = [9, 10];
        expect(aGame.getTile(someCoords)).toBeNull();

        const otherCoords = [-1, -4];
        expect(aGame.getTile(otherCoords)).toBeNull();
    });
});