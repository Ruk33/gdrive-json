// @actions
import { ActionType, Action } from './TopBarUserAction';

// @states
import { ImmutableTopBarUserState } from './ImmutableTopBarUserState';
import { TopBarUserState } from './TopBarUserState';

export function topBarUserReducer(
    state: TopBarUserState = ImmutableTopBarUserState.initialState,
    action: Action
): TopBarUserState {
    switch (action.type) {
        case ActionType.TOP_BAR_USER_FETCHING:
            return ImmutableTopBarUserState.initialState.startFetching();
        case ActionType.TOP_BAR_USER_FETCHING_SUCCESS:
            return new ImmutableTopBarUserState(state).fetchingSuccess(action);
        default:
            return state;
    }
}
