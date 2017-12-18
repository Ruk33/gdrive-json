import { getDocument, getDocumentInfo, getDocumentPermissions } from '@src/util/googleDriveApi';
import { fileIdFromUrl } from '@src/util/googleDriveFileHelper';

export enum actionTypes {
    JSON_EDITOR_SECTION_FETCHING = 'JSON_EDITOR_SECTION_FETCHING',
    JSON_EDITOR_SECTION_FETCHING_SUCCESS = 'JSON_EDITOR_SECTION_FETCHING_SUCCESS',
    JSON_EDITOR_SECTION_FETCHING_ERROR = 'JSON_EDITOR_SECTION_FETCHING_ERROR',
    JSON_EDITOR_SECTION_RESET = 'JSON_EDITOR_SECTION_RESET',
    JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP = 'JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP',
    JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP = 'JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP'
}

export type Action
    = FetchingAction
    | FetchingSuccessAction
    | Error
    | ResetAction
    | OpenNewDocumentPopup
    | CloseNewDocumentPopup
    ;

interface Error {
    type: actionTypes.JSON_EDITOR_SECTION_FETCHING_ERROR;
    payload: {
        error: {
            code: number,
            message: string
        }
    };
}

const fetchError = (errorResponse): Error => ({
    type: actionTypes.JSON_EDITOR_SECTION_FETCHING_ERROR,
    payload: { error: errorResponse }
});

export interface FetchingAction {
    type: actionTypes.JSON_EDITOR_SECTION_FETCHING;
    payload: object;
}

export interface FetchingSuccessAction {
    type: actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS;
    payload: {
        fileUrl: string,
        fileId: string,
        fileContent: string,
        fileInfo: {
            title: string,
            createdDate: string,
            modifiedDate: string
        },
        filePermissions: [{
            name: string,
            emailAddress: string,
            photoLink: string,
            role: string
        }]
    };
}

const fetchSuccess = (response): FetchingSuccessAction => ({
    type: actionTypes.JSON_EDITOR_SECTION_FETCHING_SUCCESS,
    payload: {
        fileUrl: response.fileUrl,
        fileId: response.fileId,
        fileContent: response.fileContent,
        fileInfo: response.fileInfo,
        filePermissions: response.filePermissions
    }
});

export const fetchDocument = (fileUrl) => (dispatch) => {
    if (!fileUrl) {
        return;
    }

    const fileId = fileIdFromUrl(fileUrl);

    dispatch({
        type: actionTypes.JSON_EDITOR_SECTION_FETCHING,
        payload: {}
    });

    Promise.all([
        getDocument(fileId),
        getDocumentInfo(fileId),
        getDocumentPermissions(fileId)
    ]).then((result) => {
        const fileContent = result[0].body;
        const fileInfo = result[1].result;
        const filePermissions = result[2].result.items;

        history.pushState(null, '', '?document=' + fileUrl);

        dispatch(fetchSuccess({
            fileUrl,
            fileId,
            fileContent,
            fileInfo,
            filePermissions
        }));
    }).catch((error) => dispatch(fetchError(error.result.error)));
};

export interface ResetAction {
    type: actionTypes.JSON_EDITOR_SECTION_RESET;
}

export const reset = (): ResetAction => {
    history.pushState(null, '', '/'); // Clean document query param
    return { type: actionTypes.JSON_EDITOR_SECTION_RESET };
};

interface OpenNewDocumentPopup {
    type: actionTypes.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP;
}

export const openNewDocumentPopup = (): OpenNewDocumentPopup => ({
    type: actionTypes.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP
});

interface CloseNewDocumentPopup {
    type: actionTypes.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP;
}

export const closeNewDocumentPopup = (): CloseNewDocumentPopup => ({
    type: actionTypes.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP
});
