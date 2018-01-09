import { fromJS } from 'immutable';

import { getOwner } from '@src/util/googleDriveFileHelper';

import * as JsonSectionAction from '@src/component/jsonEditorSection/JsonEditorSectionAction';
import * as AuthorizeAction from '@src/component/authorize/AuthorizeAction';
import { actionTypes, Action } from './HistoryModalAction';

const INITIAL_STATE = fromJS({
    modalIsOpen: false,
    filter: '',
    docHistory: [],
    filterDocs: []
});

const LOCAL_STORAGE_KEY = 'jsonViewer.history';

function onOpenFile(immState, action: JsonSectionAction.FetchingSuccessAction) {
    const { fileUrl, fileInfo, filePermissions, fileId } = action.payload;
    let immDocHistory = immState.get('docHistory');

    const fileAlreadyInHistoryIndex = immDocHistory.findIndex(x => x.get('fileId') === fileId);
    const owner = getOwner(filePermissions);

    if (fileAlreadyInHistoryIndex !== -1) {
        immDocHistory = immDocHistory.delete(fileAlreadyInHistoryIndex);
    }

    return immState.set(
        'docHistory',
        immDocHistory.unshift(fromJS({
            fileUrl: fileUrl,
            fileName: fileInfo.title,
            fileAuthor: owner ? owner.name : '?',
            fileAuthorAvatar: owner ? owner.photoLink : '',
            fileId: fileId
        }))
    );
}

function onAuthStatusChange(immState, action: AuthorizeAction.AuthorizeStatusChange) {
    if (action.payload.fromSession) {
        return immState;
    } else {
        return INITIAL_STATE;
    }
}

function updateLocalStorage(immState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(immState.get('docHistory').toJSON()));
    return immState;
}

function filter(immState, searchTerm: string) {
    const immDocHistory = immState.get('docHistory');
    let immFilterDocs;

    if (searchTerm) {
        const lowerCaseFilter = searchTerm.toLowerCase();

        immFilterDocs = immDocHistory.filter((immFile) => {
            const fileName: string = immFile.get('fileName');
            const fileAuthor: string = immFile.get('fileAuthor');

            return (
                fileName.toLowerCase().includes(lowerCaseFilter) ||
                fileAuthor.toLowerCase().includes(lowerCaseFilter)
            );
        });
    } else {
        immFilterDocs = immDocHistory;
    }

    return immState.merge({
        filterDocs: immFilterDocs,
        filter: searchTerm
    });
}

export function historyModalReducer(
    state = INITIAL_STATE,
    action: JsonSectionAction.Action | AuthorizeAction.AuthorizeStatusChange | Action
) {
    switch (action.type) {
        case actionTypes.HISTORY_MODAL_FILTER:
            return filter(state, action.payload.filterText);
        case actionTypes.HISTORY_MODAL_OPEN:
            return filter(state.set('modalIsOpen', true), '');
        case actionTypes.HISTORY_MODAL_CLOSE:
            return state.set('modalIsOpen', false);
        case JsonSectionAction.actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS:
            return updateLocalStorage(onOpenFile(state, action));
        case AuthorizeAction.actionTypes.AUTHORIZE_STATUS_CHANGE:
            return updateLocalStorage(onAuthStatusChange(state, action));
        default:
            const history = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
            return state.set('docHistory', fromJS(JSON.parse(history)));
    }
}
