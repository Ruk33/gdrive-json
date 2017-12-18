import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia } from 'material-ui/Card';

import { RootState } from '@src/store';
import { LoadingSpinnerComponent } from '@src/component/loadingSpinner/LoadingSpinnerComponent';
import { JsonEditorHeaderComponent } from '@src/component/jsonEditorHeader/JsonEditorHeaderComponent';
import { JsonEditorComponent } from '@src/component/jsonEditor/JsonEditorComponent';
import { HistoryModalComponent } from '@src/component/historyModal/HistoryModalComponent';
import { openModal } from '@src/component/historyModal/HistoryModalAction';
import { OpenNewDocumentComponent } from '@src/component/openNewDocument/OpenNewDocumentComponent';

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

interface JsonEditorSectionComponentProperty {
    documentId: string;
    immJsonEditorSection: any;
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
    immJsonEditorSection: any;
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

class JsonEditorSection extends React.Component<JsonEditorSectionComponentProperty> {
    editor: any;

    constructor(props: JsonEditorSectionComponentProperty) {
        super(props);

        this.setEditor = this.setEditor.bind(this);
        this.handleFormatDocument = this.handleFormatDocument.bind(this);
        this.handleInitialFormatDocument = this.handleInitialFormatDocument.bind(this);
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
        const { immJsonEditorSection } = this.props;

        return (
            <JsonEditorHeaderComponent
                fileName={immJsonEditorSection.get('fileName')}
                fileAuthorName={immJsonEditorSection.get('fileAuthorName')}
                fileAuthorEmail={immJsonEditorSection.get('fileAuthorEmail')}
                fileAuthorAvatar={immJsonEditorSection.get('fileAuthorAvatar')}
                fileIsFetched={immJsonEditorSection.get('fetched')}
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
                    fileContent={this.props.immJsonEditorSection.get('fileContent')}
                    onEditorDidMount={this.setEditor}
                    onFormatDocument={this.handleFormatDocument}
                    onInitialFormatDocument={this.handleInitialFormatDocument}
                    onUpdateLayer={this.handleUpdateLayer}
                />
            </CardMedia>
        );
    }

    render() {
        const { immJsonEditorSection } = this.props;

        if (immJsonEditorSection.get('fetching')) {
            return <div style={{ marginTop: '20px' }}><LoadingSpinnerComponent/></div>;
        } else {
            return (
                <Card>
                    <HistoryModalComponent/>
                    <OpenNewDocumentComponent
                        onContinue={this.props.onFetchDocument}
                        onClose={this.props.onCloseNewDocumentPopup}
                        errorMessage={this.props.immJsonEditorSection.get('errorMessage')}
                        isOpen={this.props.immJsonEditorSection.get('popUpNewDocumentOpen')}
                    />
                    {this.buildEditorHeader()}
                    {this.buildEditor()}
                </Card>
            );
        }
    }
}

export const JsonEditorSectionComponent = connect<JsonEditorSectionStateToProp, JsonEditorSectionActionToProp>(
    (state: RootState) => ({
        immJsonEditorSection: state.jsonEditorSection
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
