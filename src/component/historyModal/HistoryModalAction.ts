// @states
import { HistoryDocument } from './HistoryModalState';
//import { List } from "immutable";

export enum ActionType {
    HISTORY_MODAL_OPEN = 'HISTORY_MODAL_OPEN',
    HISTORY_MODAL_CLOSE = 'HISTORY_MODAL_CLOSE',
    HISTORY_MODAL_FILTER = 'HISTORY_MODAL_FILTER',
    HISTORY_MODAL_LOAD_HISTORY_FROM_SESSION = 'HISTORY_MODAL_LOAD_HISTORY_FROM_SESSION',
    HISTORY_MODAL_RESET_HISTORY = 'HISTORY_MODAL_RESET_HISTORY',
    HISTORY_MODAL_ADD_DOCUMENT_TO_TOP_OF_HISTORY = 'HISTORY_MODAL_ADD_DOCUMENT_TO_TOP_OF_HISTORY'
}

export type Action =
    | Open
    | Close
    | Filter
    | LoadHistoryFromSession
    | ResetHistory
    | AddToTopOfHistory;

interface Open {
    type: ActionType.HISTORY_MODAL_OPEN;
}
interface Close {
    type: ActionType.HISTORY_MODAL_CLOSE;
}
interface Filter {
    type: ActionType.HISTORY_MODAL_FILTER;
    payload: {
        filterText: string;
    };
}

interface LoadHistoryFromSession {
    type: ActionType.HISTORY_MODAL_LOAD_HISTORY_FROM_SESSION;
}

interface ResetHistory {
    type: ActionType.HISTORY_MODAL_RESET_HISTORY;
}

interface AddToTopOfHistory {
    type: ActionType.HISTORY_MODAL_ADD_DOCUMENT_TO_TOP_OF_HISTORY;
    payload: {
        document: HistoryDocument;
    };
}

export const openModal = (): Open => ({ type: ActionType.HISTORY_MODAL_OPEN });

export const closeModal = (): Close => ({
    type: ActionType.HISTORY_MODAL_CLOSE
});

export const filter = (filterText: string): Filter => ({
    type: ActionType.HISTORY_MODAL_FILTER,
    payload: {
        filterText
    }
});

export const loadHistoryFromSession = (): LoadHistoryFromSession => ({
    type: ActionType.HISTORY_MODAL_LOAD_HISTORY_FROM_SESSION
});

export const resetHistory = (): ResetHistory => ({
    type: ActionType.HISTORY_MODAL_RESET_HISTORY
});

export const addToTopOfHistory = (
    document: HistoryDocument
): AddToTopOfHistory => ({
    type: ActionType.HISTORY_MODAL_ADD_DOCUMENT_TO_TOP_OF_HISTORY,
    payload: {
        document
    }
});
