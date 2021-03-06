export enum ActionType {
    JSON_EDITOR_FORMAT_DOCUMENT = 'JSON_EDITOR_FORMAT_DOCUMENT',
    JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD = 'JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD',
    JSON_EDITOR_UPDATE_LAYER = 'JSON_EDITOR_UPDATE_LAYER',
    JSON_EDITOR_OPEN_SEARCH_DIALOG = 'JSON_EDITOR_OPEN_SEARCH_DIALOG'
}

export const formatDocument = editor => {
    if (editor) {
        editor.getAction('editor.action.formatDocument').run();
    }

    return { type: ActionType.JSON_EDITOR_FORMAT_DOCUMENT };
};

export const updateLayer = editor => {
    if (editor) {
        editor.layout();
    }

    return { type: ActionType.JSON_EDITOR_UPDATE_LAYER };
};

export const formatDocumentOnLoad = editor => {
    return { type: ActionType.JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD };
};

export const openSearchDialog = editor => {
    if (editor) {
        editor.getAction('actions.find').run();
    }

    return { type: ActionType.JSON_EDITOR_OPEN_SEARCH_DIALOG };
};
