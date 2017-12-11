import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia } from 'material-ui/Card';

import { RootState } from '@src/store';
import { LoadingSpinnerComponent } from '@src/component/loadingSpinner/LoadingSpinnerComponent';
import { JsonEditorHeaderComponent } from '@src/component/jsonEditorHeader/JsonEditorHeaderComponent';
import { JsonEditorComponent } from '@src/component/jsonEditor/JsonEditorComponent';
import { DocumentInputComponent } from '@src/component/documentInput/DocumentInputComponent';
import { HistoryModalComponent } from '@src/component/historyModal/HistoryModalComponent';
import { openModal } from '@src/component/historyModal/HistoryModalAction';

import { formatDocument, formatDocumentOnLoad, updateLayer, openSearchDialog } from '@src/component/jsonEditor/JsonEditorAction';
import { fetchDocument, reset } from './JsonEditorSectionAction';

interface JsonEditorSectionComponentProperty {
    documentId: string;
    immJsonEditorSection: any;
    fetchDocument: (string) => void;
    reset: () => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: (editor) => void;
    onInitialFormatDocument: (editor) => void;
    onUpdateLayer: (editor) => void;
    onOpenSearchDialog: (editor) => void;
}

interface JsonEditorSectionStateToProp {
    immJsonEditorSection: any;
}

interface JsonEditorSectionActionToProp {
    fetchDocument: (string) => void;
    reset: () => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: (editor) => void;
    onInitialFormatDocument: (editor) => void;
    onUpdateLayer: (editor) => void;
    onOpenSearchDialog: (editor) => void;
}

class JsonEditorSection extends React.Component<JsonEditorSectionComponentProperty> {
    editor: any;

    constructor(props) {
        super(props);

        this.setEditor = this.setEditor.bind(this);
        this.handleFormatDocument = this.handleFormatDocument.bind(this);
        this.handleInitialFormatDocument = this.handleInitialFormatDocument.bind(this);
        this.handleUpdateLayer = this.handleUpdateLayer.bind(this);
        this.handleOpenSearchDialog = this.handleOpenSearchDialog.bind(this);
    }

    componentDidMount() {
        this.props.fetchDocument(this.props.documentId);
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

    render() {
        const { immJsonEditorSection } = this.props;

        if (immJsonEditorSection.get('fetched')) {
            return (
                <Card>
                    <HistoryModalComponent/>
                    <JsonEditorHeaderComponent
                        fileName={immJsonEditorSection.get('fileName')}
                        fileAuthorName={immJsonEditorSection.get('fileAuthorName')}
                        fileAuthorEmail={immJsonEditorSection.get('fileAuthorEmail')}
                        fileAuthorAvatar={immJsonEditorSection.get('fileAuthorAvatar')}
                        loadNewDocument={this.props.reset}
                        onOpenHistoryModal={this.props.onOpenHistoryModal}
                        onFormatDocument={this.handleFormatDocument}
                        onOpenSearchDialog={this.handleOpenSearchDialog}
                    />
                    <CardMedia>
                        <JsonEditorComponent
                            fileContent={immJsonEditorSection.get('fileContent')}
                            onEditorDidMount={this.setEditor}
                            onFormatDocument={this.handleFormatDocument}
                            onInitialFormatDocument={this.handleInitialFormatDocument}
                            onUpdateLayer={this.handleUpdateLayer}
                        />
                    </CardMedia>
                </Card>
            );
        } else if (immJsonEditorSection.get('fetching')) {
            return <div style={{ marginTop: '20px' }}><LoadingSpinnerComponent/></div>;
        } else {
            return (
                <DocumentInputComponent
                    onContinue={this.props.fetchDocument}
                    onOpenHistoryModal={this.props.onOpenHistoryModal}
                    errorMessage={this.props.immJsonEditorSection.get('errorMessage')}
                />
            );
        }
    }
}

export const JsonEditorSectionComponent = connect<JsonEditorSectionStateToProp, JsonEditorSectionActionToProp>(
    (state: RootState) => ({
        immJsonEditorSection: state.jsonEditorSection
    }),
    {
        fetchDocument,
        reset,
        onOpenHistoryModal: openModal,
        onFormatDocument: formatDocument,
        onInitialFormatDocument: formatDocumentOnLoad,
        onUpdateLayer: updateLayer,
        onOpenSearchDialog: openSearchDialog
    }
)<JsonEditorSectionComponentProperty>(JsonEditorSection);
