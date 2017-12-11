import { login } from '@src/component/authorize/AuthorizeAction';

export const openLoginWindow = () => (dispatch) => {
    return dispatch(login());
};
