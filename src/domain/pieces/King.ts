import { Game } from '../Game';
import { Directions, Piece, Team } from '../Piece';
import { isIn } from '../utils';
import { Rook } from './Rook';
import { Tile } from '../Tile';

export class King extends Piece {
    moves(game: Game): number[][] {
        let moves: number[][] = [];
        const directions = [
            Directions.N,
            Directions.NE,
            Directions.E,
            Directions.SE,
            Directions.S,
            Directions.SW,
            Directions.W,
            Directions.NW,
        ];
        directions.forEach(
            (direction) =>
                (moves = moves.concat(this.sweepDirection(game, direction, 1)))
        );
        return moves.concat(this.getCastlingMoves(game));
    }

    canRookCastle(rookCoords: number[], game: Game): boolean {
        const piece = game.getTile(rookCoords)?.piece;
        if (piece !== null && piece instanceof Rook && piece.movesCount === 0) {
            const distance = rookCoords[0] - this.currentTile.coords[0];
            const sign = distance / Math.abs(distance);
            let directionIsFree = true;
            let x = this.currentTile.coords[0] + sign;
            while (x !== rookCoords[0]) {
                directionIsFree =
                    directionIsFree &&
                    game.getTile([x, rookCoords[1]])?.piece === null;
                x += sign;
            }
            return directionIsFree;
        }
        return false;
    }

    isCastling(startKingCoords: number[], targetKingCoords: number[]): boolean {
        return Math.abs(targetKingCoords[0] - startKingCoords[0]) === 2;
    }

    getCastlingRook(
        startKingCoords: number[],
        targetKingCoords: number[],
        game: Game
    ): Rook | null {
        const y = this.team === Team.white ? 0 : 7;
        const rookCoords = [
            [0, y],
            [7, y],
        ];
        let rook: Rook | null = null;
        rookCoords.forEach((coords) => {
            const distance = coords[0] - startKingCoords[0];
            const sign = distance / Math.abs(distance);
            const castlingDistance = targetKingCoords[0] - startKingCoords[0];
            const castlingSign = castlingDistance / Math.abs(castlingDistance);
            if (sign === castlingSign) {
                rook = game.getPiece(coords);
            }
        });
        return rook;
    }

    getCastlingMoves(game: Game): number[][] {
        if (this.isInCheck(game) || this.movesCount !== 0) {
            return [];
        }
        const y = this.team === Team.white ? 0 : 7;
        const rookCoords = [
            [0, y],
            [7, y],
        ];
        const moves: number[][] = [];
        rookCoords.forEach((coords) => {
            if (this.canRookCastle(coords, game)) {
                const distance = coords[0] - this.currentTile.coords[0];
                const sign = distance / Math.abs(distance);
                moves.push([
                    this.currentTile.coords[0] + 2 * sign,
                    this.currentTile.coords[1],
                ]);
            }
        });
        return moves;
    }

    getCastlingRookTarget(
        startKingCoords: number[],
        targetKingCoords: number[]
    ): number[] {
        const distance = targetKingCoords[0] - startKingCoords[0];
        const sign = distance / Math.abs(distance);
        return [startKingCoords[0] + sign, startKingCoords[1]];
    }

    move(game: Game, tile: Tile): boolean {
        const startKingCoords = this.currentTile.coords;
        let moved = super.move(game, tile);
        if (this.isCastling(startKingCoords, tile.coords)) {
            const rook = this.getCastlingRook(
                startKingCoords,
                tile.coords,
                game
            );
            const rookTarget = game.getTile(
                this.getCastlingRookTarget(startKingCoords, tile.coords)
            );
            if (rook !== null && rookTarget !== null) {
                game.forceMoveTo(rook, rookTarget);
            }
        }
        return moved;
    }

    /**
     * Returns true if the King is in check, false otherwise.
     * TODO: This method has 0 efficiency
     * @param game
     */
    isInCheck(game: Game): boolean {
        let inCheck = false;
        game.tiles.forEach((tile) => {
            if (
                tile.piece !== null &&
                tile.piece?.team !== this.team &&
                !(tile.piece instanceof King)
            ) {
                if (isIn(tile.piece.moves(game), this.currentTile.coords)) {
                    inCheck = inCheck || true;
                }
            }

            if (tile.piece instanceof King) {
                const distance = (a: number, b: number) => Math.abs(a - b);
                inCheck =
                    inCheck ||
                    distance(tile.coords[0], this.currentTile.coords[0]) ===
                        1 ||
                    distance(tile.coords[1], this.currentTile.coords[1]) === 1;
            }
        });
        return inCheck;
    }

    /**
     * Returns true if the King is in checkmate, false otherwise.
     * @param game
     */
    isInCheckMate(game: Game): boolean {
        const isStillInCheckAfterMove = (
            piece: Piece,
            move: number[],
            game: Game
        ) => {
            const gameSimulationAfterMove = game.simulateMove(piece, move);
            return gameSimulationAfterMove
                .getKing(this.team)
                .isInCheck(gameSimulationAfterMove);
        };

        // Bruteforce implementation
        const sameTeamPieces: (Piece | null)[] = game.tiles
            .filter(
                (tile: Tile) =>
                    tile.piece?.team === this.team && tile.piece !== null
            )
            .map((tile) => tile.piece);

        for (let i = 0; i < sameTeamPieces.length; i++) {
            const piece = sameTeamPieces[i];
            if (piece !== null) {
                const moves = piece?.moves(game) || [];
                for (let j = 0; j < moves.length; j++) {
                    if (!isStillInCheckAfterMove(piece, moves[j], game)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    get icon(): string {
        return 'chess-king';
    }

    get label(): string {
        return 'K';
    }

    clone(): Piece {
        return new King(this.team, this.movesCount);
    }
}
