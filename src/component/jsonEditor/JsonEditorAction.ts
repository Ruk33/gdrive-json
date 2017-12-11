export enum actionTypes {
    JSON_EDITOR_FORMAT_DOCUMENT = 'JSON_EDITOR_FORMAT_DOCUMENT',
    JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD = 'JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD',
    JSON_EDITOR_UPDATE_LAYER = 'JSON_EDITOR_UPDATE_LAYER',
    JSON_EDITOR_OPEN_SEARCH_DIALOG = 'JSON_EDITOR_OPEN_SEARCH_DIALOG'
};

export const formatDocument = (editor) => {
    if (editor) {
        editor.getAction('editor.action.formatDocument').run();
    }

    return { type: actionTypes.JSON_EDITOR_FORMAT_DOCUMENT };
};

export const updateLayer = (editor) => {
    if (editor) {
        editor.layout();
    }

    return { type: actionTypes.JSON_EDITOR_UPDATE_LAYER };
};

export const formatDocumentOnLoad = (editor) => {
    if (editor) {
        const onDidFocusEditor = editor.onDidFocusEditor(() => {
            onDidFocusEditor.dispose();
            formatDocument(editor);
        });

        const onDidFocusEditorText = editor.onDidFocusEditorText(() => {
            onDidFocusEditorText.dispose();
            formatDocument(editor);
        });

        const onMouseMove = editor.onMouseMove(() => {
            onMouseMove.dispose();
            formatDocument(editor);
        });

        const onMouseUp = editor.onMouseUp(() => {
            onMouseUp.dispose();
            formatDocument(editor);
        });
    }

    return { type: actionTypes.JSON_EDITOR_FORMAT_DOCUMENT_ON_LOAD };
}

export const openSearchDialog = (editor) => {
    if (editor) {
        editor.getAction('actions.find').run();
    }

    return { type: actionTypes.JSON_EDITOR_OPEN_SEARCH_DIALOG }
}
