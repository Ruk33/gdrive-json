// @vendors
import * as React from 'react';
import { connect } from 'react-redux';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NavicationClose from 'material-ui/svg-icons/navigation/close';
import { fullWhite } from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

// @stores
import { RootState } from '@src/store';

// @components
import { fetchDocument } from '@src/component/jsonEditorSection/JsonEditorSectionAction';

// @actions
import { closeModal, filter } from './HistoryModalAction';

// @states
import { HistoryModalState, HistoryDocument } from './HistoryModalState';

interface HistoryModalProperty {
    historyModalState: HistoryModalState;
    onCloseModal: () => void;
    fetchDocument: (document: string) => void;
    onChangeFilter: (searchTerm: string) => void;
}

interface HistoryModalStateToProp {
    historyModalState: HistoryModalState;
}

interface HistoryModalActionToProp {
    onCloseModal: () => void;
    fetchDocument: (document: string) => void;
    onChangeFilter: (searchTerm: string) => void;
}

export class HistoryModal extends React.Component<HistoryModalProperty> {
    constructor(props: HistoryModalProperty) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleDocClick = this.handleDocClick.bind(this);
        this.buildRow = this.buildRow.bind(this);
    }

    handleFilterChange(event, filterText: string) {
        this.props.onChangeFilter(filterText);
    }

    handleDocClick(file: HistoryDocument) {
        this.props.onCloseModal();
        this.props.fetchDocument(file.fileUrl);
    }

    buildRow(file: HistoryDocument) {
        const fileAuthorAvatar = <Avatar src={file.fileAuthorAvatar} />;

        return (
            <div key={file.fileId}>
                <Divider />
                <ListItem
                    primaryText={file.fileName}
                    leftIcon={fileAuthorAvatar}
                    secondaryText={file.fileAuthor}
                    onClick={() => this.handleDocClick(file)}
                />
            </div>
        );
    }

    buildRows() {
        const { historyModalState } = this.props;
        const historyHasNoDocuments = historyModalState.docHistory.isEmpty();
        const filterHasNoDocuments = historyModalState.filterDocs.isEmpty();

        const style = {
            border: '1px solid rgb(217, 217, 217)',
            textAlign: 'left',
            overflowY: 'auto',
            height: '195px',
            marginBottom: '20px'
        };

        let rows;

        if (historyHasNoDocuments) {
            rows = (
                <div>
                    <Divider />
                    <ListItem
                        primaryText="No documents in history"
                        secondaryText="You don't have any documents in your history. Try loading some and come back!"
                        disabled={true}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            );
        } else if (filterHasNoDocuments) {
            rows = (
                <div>
                    <Divider />
                    <ListItem
                        primaryText="Not found"
                        secondaryText="No documents were found"
                        disabled={true}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            );
        } else {
            rows = historyModalState.filterDocs.map(this.buildRow);
        }

        return (
            <List style={style}>
                <Subheader>Documents</Subheader>
                <Divider />
                {rows}
            </List>
        );
    }

    buildFilterInput() {
        const { historyModalState } = this.props;
        const historyHasDocuments = !historyModalState.docHistory.isEmpty();

        if (historyHasDocuments) {
            return (
                <TextField
                    hintText="Search file for name or author"
                    floatingLabelText="Search file"
                    fullWidth={true}
                    value={historyModalState.filterTerm}
                    onChange={this.handleFilterChange}
                />
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <Dialog
                modal={true}
                open={this.props.historyModalState.modalIsOpen}
                style={{ textAlign: 'center' }}
            >
                <Card>
                    <CardTitle
                        title="History"
                        subtitle="Click on any of the listed elements to load it as JSON"
                    />
                    <CardText>
                        {this.buildFilterInput()}
                        {this.buildRows()}
                        <FlatButton
                            backgroundColor="#D84315"
                            hoverColor="#E64A19"
                            icon={<NavicationClose color={fullWhite} />}
                            label="Close"
                            style={{ color: 'white' }}
                            onClick={this.props.onCloseModal}
                        />
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}

export const HistoryModalComponent = connect<
    HistoryModalStateToProp,
    HistoryModalActionToProp
>(
    (state: RootState) => ({
        historyModalState: state.historyModal
    }),
    {
        onCloseModal: closeModal,
        onChangeFilter: filter,
        fetchDocument
    }
)(HistoryModal);
