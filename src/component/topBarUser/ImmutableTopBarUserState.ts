// @vendors
import { Record } from 'immutable';

// @states
import { TopBarUserState, initialState } from './TopBarUserState';
import { FetchingSuccessAction } from './TopBarUserAction';

export class ImmutableTopBarUserState extends Record(initialState)
    implements TopBarUserState {
    static readonly initialState = new ImmutableTopBarUserState(initialState);

    readonly avatar: string;
    readonly displayName: string;
    readonly url: string;
    readonly fetching: boolean;
    readonly fetched: boolean;

    constructor(props: TopBarUserState) {
        super(props);
    }

    startFetching(): TopBarUserState {
        return this.merge({ fetching: true }) as this;
    }

    fetchingSuccess(action: FetchingSuccessAction): TopBarUserState {
        return this.merge({
            avatar: action.payload.image.url,
            displayName: action.payload.displayName,
            url: action.payload.url,
            fetching: false,
            fetched: true
        }) as this;
    }
}
