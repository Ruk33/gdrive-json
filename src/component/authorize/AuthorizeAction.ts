import * as google from '@src/util/googleApi';

export enum actionTypes {
    AUTHORIZE_STATUS_CHANGE = 'AUTHORIZE_STATUS_CHANGE',
    AUTHORIZE_ERROR = 'AUTHORIZE_ERROR'
}

export type Action
    = AuthorizeStatusChange
    | AuthorizeError
    ;

export interface AuthorizeStatusChange {
    type: actionTypes.AUTHORIZE_STATUS_CHANGE;
    payload: { isAuth: boolean, fromSession: boolean };
}

export function authStatusChange(isAuth: boolean, fromSession: boolean = false): AuthorizeStatusChange {
    return {
        type: actionTypes.AUTHORIZE_STATUS_CHANGE,
        payload: { isAuth, fromSession }
    };
}

interface AuthorizeError {
    type: actionTypes.AUTHORIZE_ERROR;
    payload: { error: string };
}

const authorizeError = (errorMessage): AuthorizeError => ({
    type: actionTypes.AUTHORIZE_ERROR,
    payload: { error: errorMessage }
});

export const login = () => (dispatch) => {
    return google.login(authStatusChange).then(
        () => dispatch(authStatusChange(true)),
        (result) => dispatch(authorizeError(result.error))
    );
};

export const useSession = () => (dispatch) => {
    return google.loginWithSession(authStatusChange).then(
        () => dispatch(authStatusChange(true, true))
    );
};

export const logout = () => (dispatch) => {
    return google.logout().then(() => dispatch(authStatusChange(false)));
};
