// @utils
import * as google from '@src/util/googleApi';

export enum ActionType {
    AUTHORIZE_STATUS_CHANGE = 'AUTHORIZE_STATUS_CHANGE',
    AUTHORIZE_ERROR = 'AUTHORIZE_ERROR'
}

export type Action = AuthorizeStatusChange | AuthorizeError;

export interface AuthorizeStatusChange {
    type: ActionType.AUTHORIZE_STATUS_CHANGE;
    payload: {
        isAuth: boolean;
        fromSession: boolean;
    };
}

export interface AuthorizeError {
    type: ActionType.AUTHORIZE_ERROR;
    payload: {
        error: string;
    };
}

export const authStatusChange = (
    isAuth: boolean,
    fromSession: boolean = false
): AuthorizeStatusChange => ({
    type: ActionType.AUTHORIZE_STATUS_CHANGE,
    payload: {
        isAuth,
        fromSession
    }
});

const authorizeError = (errorMessage: string): AuthorizeError => ({
    type: ActionType.AUTHORIZE_ERROR,
    payload: { error: errorMessage }
});

export const login = () => dispatch => {
    return google
        .login(authStatusChange)
        .then(
            () => dispatch(authStatusChange(true)),
            result => dispatch(authorizeError(result.error))
        );
};

export const useSession = () => dispatch => {
    return google
        .loginWithSession(authStatusChange)
        .then(() => dispatch(authStatusChange(true, true)));
};

export const logout = () => dispatch => {
    return google.logout().then(() => dispatch(authStatusChange(false)));
};
