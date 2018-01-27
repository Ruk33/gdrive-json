// @actions
import * as JsonSectionAction from '@src/component/jsonEditorSection/JsonEditorSectionAction';
import * as AuthorizeAction from '@src/component/authorize/AuthorizeAction';
import { ActionType, Action } from './HistoryModalAction';

// @states
import { HistoryModalState } from './HistoryModalState';
import { ImmutableHistoryModalState } from './ImmutableHistoryModalState';

// const LOCAL_STORAGE_KEY = 'jsonViewer.history';

// function onAuthStatusChange(immState, action: AuthorizeAction.AuthorizeStatusChange) {
//     if (action.payload.fromSession) {
//         return immState;
//     } else {
//         return INITIAL_STATE;
//     }
// }

// function updateLocalStorage(immState) {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(immState.get('docHistory').toJSON()));
//     return immState;
// }

export function historyModalReducer(
    state: HistoryModalState = ImmutableHistoryModalState.initialState,
    action:
        | JsonSectionAction.Action
        | AuthorizeAction.AuthorizeStatusChange
        | Action
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
        // case JsonSectionAction.actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS:
        //     return updateLocalStorage(onOpenFile(state, action));
        // case AuthorizeAction.ActionType.AUTHORIZE_STATUS_CHANGE:
        //     return updateLocalStorage(onAuthStatusChange(state, action));
        default:
            //     const history = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
            //     return state.set('docHistory', fromJS(JSON.parse(history)));
            return state;
    }
}
