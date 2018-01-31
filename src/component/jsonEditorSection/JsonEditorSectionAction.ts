// @utils
import {
    getDocument,
    getDocumentInfo,
    getDocumentPermissions
} from '@src/util/googleDriveApi';
import { fileIdFromUrl, getOwner } from '@src/util/googleDriveFileHelper';
import { addToTopOfHistory } from '@src/component/historyModal/HistoryModalAction';

export enum ActionType {
    JSON_EDITOR_SECTION_FETCHING = 'JSON_EDITOR_SECTION_FETCHING',
    JSON_EDITOR_SECTION_FETCHING_SUCCESS = 'JSON_EDITOR_SECTION_FETCHING_SUCCESS',
    JSON_EDITOR_SECTION_FETCHING_ERROR = 'JSON_EDITOR_SECTION_FETCHING_ERROR',
    JSON_EDITOR_SECTION_RESET = 'JSON_EDITOR_SECTION_RESET',
    JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP = 'JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP',
    JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP = 'JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP'
}

export type Action =
    | FetchingAction
    | FetchingSuccessAction
    | FetchingErrorAction
    | ResetAction
    | OpenNewDocumentPopup
    | CloseNewDocumentPopup;

export interface FetchingAction {
    type: ActionType.JSON_EDITOR_SECTION_FETCHING;
}

export interface FetchingSuccessAction {
    type: ActionType.JSON_EDITOR_SECTION_FETCHING_SUCCESS;
    payload: {
        fileUrl: string;
        fileId: string;
        fileContent: string;
        fileInfo: {
            title: string;
            createdDate: string;
            modifiedDate: string;
        };
        filePermissions: [
            {
                name: string;
                emailAddress: string;
                photoLink: string;
                role: string;
            }
        ];
    };
}

interface FetchingErrorAction {
    type: ActionType.JSON_EDITOR_SECTION_FETCHING_ERROR;
    payload: {
        error: {
            code: number;
            message: string;
        };
    };
}

export interface ResetAction {
    type: ActionType.JSON_EDITOR_SECTION_RESET;
}

interface OpenNewDocumentPopup {
    type: ActionType.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP;
}

interface CloseNewDocumentPopup {
    type: ActionType.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP;
}

const fetchError = (errorResponse): FetchingErrorAction => ({
    type: ActionType.JSON_EDITOR_SECTION_FETCHING_ERROR,
    payload: { error: errorResponse }
});

const fetchSuccess = (response): FetchingSuccessAction => ({
    type: ActionType.JSON_EDITOR_SECTION_FETCHING_SUCCESS,
    payload: {
        fileUrl: response.fileUrl,
        fileId: response.fileId,
        fileContent: response.fileContent,
        fileInfo: response.fileInfo,
        filePermissions: response.filePermissions
    }
});

const updateUriAfterFetchingDocument = (fileUrl: string) => {
    history.pushState(null, '', `?document=${fileUrl}`);
};

const clearUriAfterReset = () => {
    history.pushState(null, '', '/');
};

export const fetchDocument = fileUrl => dispatch => {
    if (!fileUrl) {
        return;
    }

    const fileId = fileIdFromUrl(fileUrl);

    dispatch({ type: ActionType.JSON_EDITOR_SECTION_FETCHING });

    Promise.all([
        getDocument(fileId),
        getDocumentInfo(fileId),
        getDocumentPermissions(fileId)
    ])
        .then(result => {
            const fileContent = result[0].body;
            const fileInfo = result[1].result;
            const filePermissions = result[2].result.items;
            const owner = getOwner(filePermissions);

            updateUriAfterFetchingDocument(fileUrl);

            dispatch(
                addToTopOfHistory({
                    fileUrl,
                    fileName: fileInfo.title,
                    fileAuthor: owner ? owner.name : '?',
                    fileAuthorAvatar: owner ? owner.photoLink : '',
                    fileId
                })
            );

            dispatch(
                fetchSuccess({
                    fileUrl,
                    fileId,
                    fileContent,
                    fileInfo,
                    filePermissions
                })
            );
        })
        .catch(error => dispatch(fetchError(error.result.error)));
};

export const reset = (): ResetAction => {
    clearUriAfterReset();
    return { type: ActionType.JSON_EDITOR_SECTION_RESET };
};

export const openNewDocumentPopup = (): OpenNewDocumentPopup => ({
    type: ActionType.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP
});

export const closeNewDocumentPopup = (): CloseNewDocumentPopup => ({
    type: ActionType.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP
});
