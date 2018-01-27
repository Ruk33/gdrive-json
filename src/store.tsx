import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { topBarUserReducer } from '@src/component/topBarUser/TopBarUserReducer';
import { authorizeReducer } from '@src/component/authorize/AuthorizeReducer';
import { AuthorizeState } from '@src/component/authorize/AuthorizeState';
import { jsonEditorSectionReducer } from '@src/component/jsonEditorSection/JsonEditorSectionReducer';
import { ActionType } from '@src/component/authorize/AuthorizeAction';
import { historyModalReducer } from '@src/component/historyModal/HistoryModalReducer';
import { HistoryModalState } from '@src/component/historyModal/HistoryModalState';
import { JsonEditorSectionState } from '@src/component/jsonEditorSection/JsonEditorSectionState';
import { TopBarUserState } from '@src/component/topBarUser/TopBarUserState';

export interface RootState {
    topBarUser: TopBarUserState;
    jsonEditorSection: JsonEditorSectionState;
    authorize: AuthorizeState;
    historyModal: HistoryModalState;
}

const appReducer = combineReducers<RootState>({
    topBarUser: topBarUserReducer,
    jsonEditorSection: jsonEditorSectionReducer,
    authorize: authorizeReducer,
    historyModal: historyModalReducer
});

function rootReducer(state, action): RootState {
    const userLoggedOut =
        action.type === ActionType.AUTHORIZE_STATUS_CHANGE &&
        !action.payload.isAuth;

    if (userLoggedOut) {
        state = undefined;
    }

    return appReducer(state, action);
}

export const store = createStore<RootState>(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
