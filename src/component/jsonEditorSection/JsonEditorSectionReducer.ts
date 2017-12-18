import { fromJS } from 'immutable';

import { Action, actionTypes } from './JsonEditorSectionAction';

const INITIAL_STATE = fromJS({
    fetching: false,
    fetched: false,
    popUpNewDocumentOpen: true,
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
        case actionTypes.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP:
            return state.merge({
                popUpNewDocumentOpen: false,
                errorMessage: ''
            });
        case actionTypes.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP:
            return state.set('popUpNewDocumentOpen', true);
        case actionTypes.JSON_EDITOR_SECTION_RESET:
            return INITIAL_STATE;
        case actionTypes.JSON_EDITOR_SECTION_FETCHING:
            return state.set('fetching', true);
        case actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS:
            const owner = getOwner(action.payload.filePermissions);

            return state.merge({
                popUpNewDocumentOpen: false,
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
            const error = action.payload.error.message;
            return state.merge({
                errorMessage: `${error} (make sure you have privileges to access this file)`,
                popUpNewDocumentOpen: true,
                fetching: false
            });
        default:
            return state;
    }
}
