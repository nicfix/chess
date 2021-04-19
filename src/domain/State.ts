import {Game} from "./Game";
import {Tile} from "./Tile";
import {Piece, Team} from "./Piece";
import {Pawn} from "./pieces/Pawn";

interface IMoveData {
    clickedTile?: Tile | undefined;
    castling?: boolean;
    enPassant?: boolean;
    promotedPiece?: Piece;
}

interface IStateData {
    selectedTile?: Tile | undefined;
    target?: Tile | undefined;
    currentTeam: Team,
    game: Game
}

export default class State {
    constructor(
        public readonly data: IStateData
    ) {
    }

    next(moveData: IMoveData): State {
        throw new Error("Not implemented, use a concrete implementation");
    }

    label(): string {
        return this.constructor.name;
    }
}

export class MoveState extends State {
    next(moveData: IMoveData): State {
        const {currentTeam, selectedTile, game} = this.data;
        const tile = moveData.clickedTile;
        if (tile === undefined) {
            return this;
        }

        const piece = tile.piece;

        const playerClickedOnAnotherOfHisPieces = piece !== null && piece.team === currentTeam;
        if (playerClickedOnAnotherOfHisPieces) {
            return new MoveState({...this.data, selectedTile: tile})
        }

        if (piece !== null && game.moveTo(piece, tile)) {
            return this.nextOnMove(moveData);
        }

        alert(`Invalid move`);
        return this;
    }

    protected nextOnMove(moveData: IMoveData): State {
        const {currentTeam, game} = this.data;
        const {clickedTile} = moveData;

        if (clickedTile?.piece instanceof Pawn) {
            const isLastRank = (currentTeam === Team.white && clickedTile?.y === 7) ||
                (currentTeam === Team.black && clickedTile?.y === 0)

            const teamHasCapturedPieces = game.getTeamCapturedPieces(currentTeam).length > 0;

            if (isLastRank && teamHasCapturedPieces) {
                return new PromotionState({...this.data, selectedTile: clickedTile});
            }
        }

        return new SelectPieceState(
            {
                game: this.data.game,
                currentTeam: (currentTeam === Team.white) ? Team.black : Team.white
            }
        )
    }

    label(): string {
        return "Move";
    }
}

export class SelectPieceState extends State {
    next(moveData: IMoveData): State {
        const {clickedTile} = moveData;

        if (clickedTile === undefined) {
            return this;
        }

        if (clickedTile?.piece?.team !== this.data.currentTeam) {
            alert(`It's ${this.data.currentTeam} turn`);
            return this;
        }

        return new MoveState({...this.data, selectedTile: clickedTile});
    }

    label(): string {
        return "Select a piece";
    }
}

export class PromotionState extends State {

    next(moveData: IMoveData): State {
        const {currentTeam, selectedTile, game} = this.data;

        const {promotedPiece} = moveData;
        if (selectedTile !== undefined && promotedPiece !== undefined) {
            selectedTile.piece = promotedPiece;
            const capturedPieces = game.getTeamCapturedPieces(currentTeam);
            const index = capturedPieces.indexOf(promotedPiece);
            capturedPieces.splice(index, 1);
        }

        return new SelectPieceState(
            {
                game: this.data.game,
                currentTeam: (currentTeam === Team.white) ? Team.black : Team.white
            }
        )
    }

    label(): string {
        return "Promote your pawn";
    }
}