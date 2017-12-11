import * as google from '@src/util/googleApi';

export enum actionTypes {
    AUTHORIZE_STATUS_CHANGE = 'AUTHORIZE_STATUS_CHANGE'
};

export type Action
    = AuthorizeStatusChange
    ;

interface AuthorizeStatusChange {
    type: actionTypes.AUTHORIZE_STATUS_CHANGE;
    payload: { isAuth: boolean, fromSession: boolean };
}

export function authStatusChange(isAuth, fromSession = false): AuthorizeStatusChange {
    return {
        type: actionTypes.AUTHORIZE_STATUS_CHANGE,
        payload: { isAuth, fromSession }
    };
}

export const login = () => (dispatch) => {
    return google.login(authStatusChange).then(() => dispatch(authStatusChange(true)));
}

export const useSession = () => (dispatch) => {
    return google.loginWithSession(authStatusChange).then(
        () => dispatch(authStatusChange(true, true))
    );
};

export const logout = () => (dispatch) => {
    return google.logout().then(() => dispatch(authStatusChange(false)));
};
