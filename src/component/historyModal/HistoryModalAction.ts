export enum actionTypes {
    HISTORY_MODAL_OPEN = 'HISTORY_MODAL_OPEN',
    HISTORY_MODAL_CLOSE = 'HISTORY_MODAL_CLOSE',
    HISTORY_MODAL_FILTER = 'HISTORY_MODAL_FILTER'
}

export type Action
    = Open
    | Close
    | Filter
    ;

interface Open {
    type: actionTypes.HISTORY_MODAL_OPEN;
}

export const openModal = (): Open => ({ type: actionTypes.HISTORY_MODAL_OPEN });

interface Close {
    type: actionTypes.HISTORY_MODAL_CLOSE;
}

export const closeModal = (): Close => ({ type: actionTypes.HISTORY_MODAL_CLOSE });

interface Filter {
    type: actionTypes.HISTORY_MODAL_FILTER;
    payload: { filterText: string };
}

export const filter = (filterText: string): Filter => ({
    type: actionTypes.HISTORY_MODAL_FILTER,
    payload: { filterText }
});
