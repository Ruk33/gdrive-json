// @vendors
import { Record } from 'immutable';

// @utils
import { getErrorMessageByCode } from '@src/util/googleAuthError';

// @states
import { AuthorizeState, initialState } from './AuthorizeState';

export class ImmutableAuthorizeState extends Record(initialState)
    implements AuthorizeState {
    static readonly initialState = new ImmutableAuthorizeState(initialState);

    readonly isAuth: boolean;
    readonly error: string;

    constructor(props: AuthorizeState) {
        super(props);
    }

    authStateChanged(newAuthState: boolean): ImmutableAuthorizeState {
        return this.merge({ isAuth: newAuthState }) as this;
    }

    authorizeError(errorCode: string): ImmutableAuthorizeState {
        return this.merge({ error: getErrorMessageByCode(errorCode) }) as this;
    }
}
