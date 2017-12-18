import { fromJS } from 'immutable';

import { Action, actionTypes } from './AuthorizeAction';

const INITIAL_STATE = fromJS({
    isAuth: false,
    error: ''
});

function getErrorMessageByCode(errorCode: string) {
    switch (errorCode) {
        case 'popup_blocked_by_browser':
            return 'Google login popup has been blocked, please enable popups';
        default:
            return '';
    }
}

export function authorizeReducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case actionTypes.AUTHORIZE_ERROR:
            return INITIAL_STATE.set('error', getErrorMessageByCode(action.payload.error));
        case actionTypes.AUTHORIZE_STATUS_CHANGE:
            return INITIAL_STATE.set('isAuth', action.payload.isAuth);
        default:
            return state;
    }
}
