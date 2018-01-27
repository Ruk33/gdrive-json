export interface TopBarUserState {
    readonly avatar: string;
    readonly displayName: string;
    readonly url: string;
    readonly fetching: boolean;
    readonly fetched: boolean;
}

export const initialState: TopBarUserState = {
    avatar: '',
    displayName: '',
    url: '',
    fetching: false,
    fetched: false
};
