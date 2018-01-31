// @actions
import { ActionType, Action } from './HistoryModalAction';

// @states
import { HistoryModalState } from './HistoryModalState';
import { ImmutableHistoryModalState } from './ImmutableHistoryModalState';

export function historyModalReducer(
    state: HistoryModalState = ImmutableHistoryModalState.initialState,
    action: Action
): HistoryModalState {
    switch (action.type) {
        case ActionType.HISTORY_MODAL_FILTER:
            return new ImmutableHistoryModalState(state).updateFilter(
                action.payload.filterText
            );
        case ActionType.HISTORY_MODAL_OPEN:
            return new ImmutableHistoryModalState(state).openHistoryModal();
        case ActionType.HISTORY_MODAL_CLOSE:
            return new ImmutableHistoryModalState(state).closeHistoryModal();
        case ActionType.HISTORY_MODAL_LOAD_HISTORY_FROM_SESSION:
            return new ImmutableHistoryModalState(
                state
            ).loadHistoryFromSession();
        case ActionType.HISTORY_MODAL_RESET_HISTORY:
            return new ImmutableHistoryModalState(state).resetHistory();
        case ActionType.HISTORY_MODAL_ADD_DOCUMENT_TO_TOP_OF_HISTORY:
            const document = action.payload.document;
            return new ImmutableHistoryModalState(
                state
            ).addDocumentOnTopOfHistory(document);
        default:
            return state;
    }
}
