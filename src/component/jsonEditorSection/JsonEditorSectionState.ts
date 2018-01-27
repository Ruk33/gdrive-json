export interface JsonEditorSectionState {
    readonly fetching: boolean;
    readonly fetched: boolean;
    readonly popUpNewDocumentOpen: boolean;
    readonly fileName: string;
    readonly fileAuthorName: string;
    readonly fileAuthorEmail: string;
    readonly fileAuthorAvatar: string;
    readonly fileContent: string;
    readonly errorMessage: string;
}

export const initialState: JsonEditorSectionState = {
    fetching: false,
    fetched: false,
    popUpNewDocumentOpen: true,
    fileName: '',
    fileAuthorName: '',
    fileAuthorEmail: '',
    fileAuthorAvatar: '',
    fileContent: '',
    errorMessage: ''
};
