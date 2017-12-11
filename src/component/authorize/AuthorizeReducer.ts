import { fromJS } from 'immutable';

import { Action, actionTypes } from './AuthorizeAction';

const INITIAL_STATE = fromJS({
    isAuth: false
});

export function authorizeReducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case actionTypes.AUTHORIZE_STATUS_CHANGE:
            return state.set('isAuth', action.payload.isAuth);
        default:
            return state;
    }
}
