// @vendors
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia } from 'material-ui/Card';

// @states
import { RootState } from '@src/store';

// @components
import { LoadingSpinnerComponent } from '@src/component/loadingSpinner/LoadingSpinnerComponent';
import { JsonEditorHeaderComponent } from '@src/component/jsonEditorHeader/JsonEditorHeaderComponent';
import { JsonEditorComponent } from '@src/component/jsonEditor/JsonEditorComponent';
import { HistoryModalComponent } from '@src/component/historyModal/HistoryModalComponent';
import { openModal } from '@src/component/historyModal/HistoryModalAction';
import { OpenNewDocumentComponent } from '@src/component/openNewDocument/OpenNewDocumentComponent';
import { DocumentInputComponent } from '@src/component/documentInput/DocumentInputComponent';

// @actions
import {
    formatDocument,
    formatDocumentOnLoad,
    updateLayer,
    openSearchDialog
} from '@src/component/jsonEditor/JsonEditorAction';

import {
    fetchDocument,
    openNewDocumentPopup,
    closeNewDocumentPopup
} from './JsonEditorSectionAction';

// @states
import { JsonEditorSectionState } from './JsonEditorSectionState';

interface JsonEditorSectionComponentProperty {
    documentId: string;
    jsonEditorSectionState: JsonEditorSectionState;
    onFetchDocument: (document: string) => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: (editor: any) => void;
    onInitialFormatDocument: (editor: any) => void;
    onUpdateLayer: (editor: any) => void;
    onOpenSearchDialog: (editor: any) => void;
    onOpenNewDocumentPopup: () => void;
    onCloseNewDocumentPopup: () => void;
}

interface JsonEditorSectionStateToProp {
    jsonEditorSectionState: JsonEditorSectionState;
}

interface JsonEditorSectionActionToProp {
    onFetchDocument: (document: string) => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: (editor: any) => void;
    onInitialFormatDocument: (editor: any) => void;
    onUpdateLayer: (editor: any) => void;
    onOpenSearchDialog: (editor: any) => void;
    onOpenNewDocumentPopup: () => void;
    onCloseNewDocumentPopup: () => void;
}

class JsonEditorSection extends React.Component<
    JsonEditorSectionComponentProperty
> {
    editor: any;

    constructor(props: JsonEditorSectionComponentProperty) {
        super(props);

        this.setEditor = this.setEditor.bind(this);
        this.handleFormatDocument = this.handleFormatDocument.bind(this);
        this.handleInitialFormatDocument = this.handleInitialFormatDocument.bind(
            this
        );
        this.handleUpdateLayer = this.handleUpdateLayer.bind(this);
        this.handleOpenSearchDialog = this.handleOpenSearchDialog.bind(this);
    }

    componentDidMount() {
        this.props.onFetchDocument(this.props.documentId);
    }

    setEditor(editor) {
        this.editor = editor;
    }

    handleFormatDocument() {
        this.props.onFormatDocument(this.editor);
    }

    handleInitialFormatDocument() {
        this.props.onInitialFormatDocument(this.editor);
    }

    handleUpdateLayer() {
        this.props.onUpdateLayer(this.editor);
    }

    handleOpenSearchDialog() {
        this.props.onOpenSearchDialog(this.editor);
    }

    buildEditorHeader() {
        const { jsonEditorSectionState } = this.props;

        return (
            <JsonEditorHeaderComponent
                fileName={jsonEditorSectionState.fileName}
                fileAuthorName={jsonEditorSectionState.fileAuthorName}
                fileAuthorEmail={jsonEditorSectionState.fileAuthorEmail}
                fileAuthorAvatar={jsonEditorSectionState.fileAuthorAvatar}
                fileIsFetched={jsonEditorSectionState.fetched}
                onLoadNewDocumentClick={this.props.onOpenNewDocumentPopup}
                onOpenHistoryModal={this.props.onOpenHistoryModal}
                onFormatDocument={this.handleFormatDocument}
                onOpenSearchDialog={this.handleOpenSearchDialog}
            />
        );
    }

    buildEditor() {
        return (
            <CardMedia>
                <JsonEditorComponent
                    fileContent={this.props.jsonEditorSectionState.fileContent}
                    onEditorDidMount={this.setEditor}
                    onFormatDocument={this.handleFormatDocument}
                    onInitialFormatDocument={this.handleInitialFormatDocument}
                    onUpdateLayer={this.handleUpdateLayer}
                />
            </CardMedia>
        );
    }

    render() {
        const { jsonEditorSectionState } = this.props;

        const isFetchingDocument = jsonEditorSectionState.fetching;
        const isDocumentFetched = jsonEditorSectionState.fetched;

        if (isFetchingDocument) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <LoadingSpinnerComponent />
                </div>
            );
        } else if (isDocumentFetched) {
            return (
                <Card>
                    <HistoryModalComponent />
                    <OpenNewDocumentComponent
                        onContinue={this.props.onFetchDocument}
                        onClose={this.props.onCloseNewDocumentPopup}
                        errorMessage={
                            this.props.jsonEditorSectionState.errorMessage
                        }
                        isOpen={
                            this.props.jsonEditorSectionState
                                .popUpNewDocumentOpen
                        }
                    />
                    {this.buildEditorHeader()}
                    {this.buildEditor()}
                </Card>
            );
        } else {
            return (
                <DocumentInputComponent
                    onContinue={this.props.onFetchDocument}
                    onOpenHistoryModal={this.props.onOpenHistoryModal}
                    errorMessage={
                        this.props.jsonEditorSectionState.errorMessage
                    }
                />
            );
        }
    }
}

export const JsonEditorSectionComponent = connect<
    JsonEditorSectionStateToProp,
    JsonEditorSectionActionToProp
>(
    (state: RootState) => ({
        jsonEditorSectionState: state.jsonEditorSection
    }),
    {
        onFetchDocument: fetchDocument,
        onOpenHistoryModal: openModal,
        onFormatDocument: formatDocument,
        onInitialFormatDocument: formatDocumentOnLoad,
        onUpdateLayer: updateLayer,
        onOpenSearchDialog: openSearchDialog,
        onOpenNewDocumentPopup: openNewDocumentPopup,
        onCloseNewDocumentPopup: closeNewDocumentPopup
    }
)<JsonEditorSectionComponentProperty>(JsonEditorSection);
