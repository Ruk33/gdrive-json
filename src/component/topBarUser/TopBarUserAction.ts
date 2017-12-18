import { getUser } from '@src/util/googlePlusApi';

export enum actionTypes {
    TOP_BAR_USER_FETCHING = 'TOP_BAR_USER_FETCHING',
    TOP_BAR_USER_FETCHING_SUCCESS = 'TOP_BAR_USER_FETCHING_SUCCESS',
    TOP_BAR_USER_FETCHING_FAILURE = 'TOP_BAR_USER_FETCHING_FAILURE'
}

export type Action
    = FetchingAction
    | FetchingSuccessAction
    ;

export interface FetchingAction {
    type: actionTypes.TOP_BAR_USER_FETCHING;
    payload: object;
}

export interface FetchingSuccessAction {
    type: actionTypes.TOP_BAR_USER_FETCHING_SUCCESS;
    payload: {
        displayName: string,
        url: string,
        image: { url: string }
    };
}

const fetchSuccess = (response): FetchingSuccessAction => ({
    type: actionTypes.TOP_BAR_USER_FETCHING_SUCCESS,
    payload: response
});

export const fetch = () => (dispatch) => {
    dispatch({
        type: actionTypes.TOP_BAR_USER_FETCHING,
        payload: {}
    });

    getUser().then((response) => dispatch(fetchSuccess(response.result)));
};
