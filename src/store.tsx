import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { topBarUserReducer } from '@src/component/topBarUser/TopBarUserReducer';
import { authorizeReducer } from '@src/component/authorize/AuthorizeReducer';
import { jsonEditorSectionReducer } from '@src/component/jsonEditorSection/JsonEditorSectionReducer';
import { actionTypes } from '@src/component/authorize/AuthorizeAction';
import { historyModalReducer } from '@src/component/historyModal/HistoryModalReducer';

export interface RootState {
    topBarUser: any;
    jsonEditorSection: any;
    authorize: any;
    historyModal: any;
}

const appReducer = combineReducers<RootState>({
    topBarUser: topBarUserReducer,
    jsonEditorSection: jsonEditorSectionReducer,
    authorize: authorizeReducer,
    historyModal: historyModalReducer
});

function rootReducer(state, action): RootState {
    const userLoggedOut = (
        action.type === actionTypes.AUTHORIZE_STATUS_CHANGE &&
        !action.payload.isAuth
    );

    if (userLoggedOut) {
        state = undefined;
    }

    return appReducer(state, action);
}

export const store = createStore<RootState>(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
