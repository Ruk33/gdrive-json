import { fromJS } from 'immutable';

import { actionTypes, Action } from './TopBarUserAction';

const INITIAL_STATE = fromJS({
    avatar: '',
    displayName: '',
    url: '',
    fetching: false,
    fetched: false
});

export function topBarUserReducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case actionTypes.TOP_BAR_USER_FETCHING:
            return INITIAL_STATE.set('fetching', true);
        case actionTypes.TOP_BAR_USER_FETCHING_SUCCESS:
            return state.merge({
                avatar: action.payload.image.url,
                displayName: action.payload.displayName,
                url: action.payload.url,
                fetching: false,
                fetched: true
            });
        default:
            return state;
    }
}
