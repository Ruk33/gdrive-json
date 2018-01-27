export interface AuthorizeState {
    readonly isAuth: boolean;
    readonly error: string;
}

export const initialState: AuthorizeState = {
    isAuth: false,
    error: ''
};
