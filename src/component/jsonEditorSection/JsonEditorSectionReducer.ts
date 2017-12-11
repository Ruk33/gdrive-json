import { fromJS } from "immutable";

import { Action, actionTypes } from './JsonEditorSectionAction';

const INITIAL_STATE = fromJS({
    fetching: false,
    fetched: false,
    fileName: '',
    fileAuthorName: '',
    fileAuthorEmail: '',
    fileAuthorAvatar: '',
    fileContent: '',
    errorMessage: ''
});

const getOwner = (permissions) => permissions.find(x => x.role === 'owner');

export function jsonEditorSectionReducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case actionTypes.JSON_EDITOR_SECTION_RESET:
            return INITIAL_STATE;
        case actionTypes.JSON_EDITOR_SECTION_FETCHING:
            return INITIAL_STATE.set('fetching', true);
        case actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS:
            const owner = getOwner(action.payload.filePermissions);

            return state.merge({
                fetching: false,
                fetched: true,
                fileName: action.payload.fileInfo.title,
                fileAuthorName: owner.name,
                fileAuthorEmail: owner.emailAddress,
                fileAuthorAvatar: owner.photoLink,
                fileContent: action.payload.fileContent,
                errorMessage: ''
            });
        case actionTypes.JSON_EDITOR_SECTION_FETCHING_ERROR:
            return INITIAL_STATE.set(
                'errorMessage',
                action.payload.error.message + ' (make sure you have privileges to access this file)'
            );
        default:
            return state;
    }
}
