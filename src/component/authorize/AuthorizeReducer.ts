// @actions
import { Action, ActionType } from './AuthorizeAction';

// @states
import { AuthorizeState } from './AuthorizeState';
import { ImmutableAuthorizeState } from './ImmutableAuthorizeState';

export function authorizeReducer(
    state: AuthorizeState = ImmutableAuthorizeState.initialState,
    action: Action
): AuthorizeState {
    switch (action.type) {
        case ActionType.AUTHORIZE_ERROR:
            return ImmutableAuthorizeState.initialState.authorizeError(
                action.payload.error
            );
        case ActionType.AUTHORIZE_STATUS_CHANGE:
            return ImmutableAuthorizeState.initialState.authStateChanged(
                action.payload.isAuth
            );
        default:
            return state;
    }
}
