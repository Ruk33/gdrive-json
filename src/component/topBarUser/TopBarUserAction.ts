// @utils
import { getUser } from '@src/util/googlePlusApi';

export enum ActionType {
    TOP_BAR_USER_FETCHING = 'TOP_BAR_USER_FETCHING',
    TOP_BAR_USER_FETCHING_SUCCESS = 'TOP_BAR_USER_FETCHING_SUCCESS',
    TOP_BAR_USER_FETCHING_FAILURE = 'TOP_BAR_USER_FETCHING_FAILURE'
}

export type Action = FetchingAction | FetchingSuccessAction;

export interface FetchingAction {
    type: ActionType.TOP_BAR_USER_FETCHING;
}

export interface FetchingSuccessAction {
    type: ActionType.TOP_BAR_USER_FETCHING_SUCCESS;
    payload: {
        displayName: string;
        url: string;
        image: { url: string };
    };
}

const fetchSuccess = (response): FetchingSuccessAction => ({
    type: ActionType.TOP_BAR_USER_FETCHING_SUCCESS,
    payload: response
});

export const fetch = () => dispatch => {
    dispatch({
        type: ActionType.TOP_BAR_USER_FETCHING,
        payload: {}
    });

    getUser().then(response => dispatch(fetchSuccess(response.result)));
};
