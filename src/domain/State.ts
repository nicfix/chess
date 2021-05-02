import { Game } from './Game';
import { Tile } from './Tile';
import { Piece, Team } from './Piece';

interface IMoveData {
    clickedTile?: Tile | undefined;
    enPassant?: boolean;
    promotedPiece?: Piece;
}

interface IStateData {
    selectedTile?: Tile | undefined;
    target?: Tile | undefined;
    currentTeam: Team;
    game: Game;
}

export default class State {
    constructor(public readonly data: IStateData) {
    }

    next(moveData: IMoveData): State {
        throw new Error('Not implemented, use a concrete implementation');
    }

    label(): string {
        return this.constructor.name;
    }
}

export class MoveState extends State {

    next(moveData: IMoveData): State {
        const { currentTeam, selectedTile, game } = this.data;
        const tile = moveData.clickedTile;
        if (tile === undefined) {
            return this;
        }

        const piece = tile.piece;
        const selectedPiece = selectedTile?.piece || null;
        const playerClickedOnAnotherOfHisPieces =
            piece !== null && piece.team === currentTeam;

        if (playerClickedOnAnotherOfHisPieces) {
            return this.clone({ ...this.data, selectedTile: tile });
        }

        if (selectedPiece !== null && game.moveTo(selectedPiece, tile)) {
            return this.onMoveSuccess(moveData);
        }

        alert(`Invalid move`);
        return this;
    }

    protected onMoveSuccess(moveData: IMoveData): State {
        const { currentTeam, game } = this.data;
        const { clickedTile } = moveData;
        const oppositeTeam = currentTeam === Team.white ? Team.black : Team.white;

        if (game.canPromote(currentTeam)) {
            return new PromotionState({
                ...this.data,
                selectedTile: clickedTile
            });
        }

        if (game.isInCheckMate(oppositeTeam)) {
            return new CheckMateState({
                game: this.data.game,
                currentTeam: oppositeTeam
            });
        }

        if (game.isInCheck(oppositeTeam)) {
            return new SelectPieceInCheckState({
                game: this.data.game,
                currentTeam: oppositeTeam
            });
        }

        return new SelectPieceState({
            game: this.data.game,
            currentTeam: oppositeTeam
        });
    }

    label(): string {
        return 'Move';
    }

    clone(stateData: IStateData): MoveState {
        return new MoveState(stateData);
    }
}

export class SelectPieceState extends State {

    getMoveState(data: IStateData): State {
        return new MoveState(data);
    }

    next(moveData: IMoveData): State {
        const { clickedTile } = moveData;

        if (clickedTile === undefined) {
            return this;
        }

        if (clickedTile?.piece?.team !== this.data.currentTeam) {
            alert(`It's ${this.data.currentTeam} turn`);
            return this;
        }

        return this.getMoveState({ ...this.data, selectedTile: clickedTile });
    }

    label(): string {
        return 'Select a piece';
    }
}

export class PromotionState extends State {
    next(moveData: IMoveData): State {
        const { currentTeam, selectedTile, game } = this.data;
        const { promotedPiece } = moveData;
        const oppositeTeam = currentTeam === Team.white ? Team.black : Team.white;
        if (selectedTile !== undefined && promotedPiece !== undefined) {
            game.promote(promotedPiece, selectedTile, currentTeam);
        }

        if (game.isInCheckMate(oppositeTeam)) {
            return new CheckMateState({
                game: this.data.game,
                currentTeam: oppositeTeam
            });
        }

        if (game.isInCheck(oppositeTeam)) {
            return new SelectPieceInCheckState({
                game: this.data.game,
                currentTeam: oppositeTeam
            });
        }

        return new SelectPieceState({
            game: this.data.game,
            currentTeam: currentTeam === Team.white ? Team.black : Team.white
        });
    }

    label(): string {
        return 'Promote your pawn';
    }
}

export class SelectPieceInCheckState extends SelectPieceState {

    getMoveState(data: IStateData): State {
        return new MovePieceInCheckState(data);
    }

    label(): string {
        return 'Check! Save the king';
    }
}

export class MovePieceInCheckState extends MoveState {
    label(): string {
        return 'Check! Save the king';
    }

    clone(stateData: IStateData): MoveState {
        return new MovePieceInCheckState(stateData);
    }
}

export class CheckMateState extends State {
    label(): string {
        const oppositeTeam = this.data.currentTeam === Team.white ? Team.black : Team.white;
        return `Check mate! Player ${oppositeTeam} wins`;
    }

    next(moveData: IMoveData): State {
        const oppositeTeam = this.data.currentTeam === Team.white ? Team.black : Team.white;
        alert(`Player ${oppositeTeam} wins, no more moves allowed.`);
        return this;
    }
}
