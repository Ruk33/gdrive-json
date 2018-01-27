export enum ActionType {
    HISTORY_MODAL_OPEN = 'HISTORY_MODAL_OPEN',
    HISTORY_MODAL_CLOSE = 'HISTORY_MODAL_CLOSE',
    HISTORY_MODAL_FILTER = 'HISTORY_MODAL_FILTER'
}

export type Action = Open | Close | Filter;

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
