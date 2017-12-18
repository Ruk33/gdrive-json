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

import { RootState } from '@src/store';

import { fetchDocument } from '@src/component/jsonEditorSection/JsonEditorSectionAction';
import { closeModal, filter } from './HistoryModalAction';

interface HistoryModalProperty {
    immHistoryModal: any;
    onCloseModal: () => void;
    fetchDocument: (document: string) => void;
    onChangeFilter: (searchTerm: string) => void;
}

interface HistoryModalStateToProp {
    immHistoryModal: any;
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

    handleDocClick(immFile) {
        this.props.onCloseModal();
        this.props.fetchDocument(immFile.get('fileUrl'));
    }

    buildRow(immFile) {
        const fileAuthorAvatar = <Avatar src={immFile.get('fileAuthorAvatar')}/>;

        return (
            <div key={immFile.get('fileId')}>
                <Divider/>
                <ListItem
                    primaryText={immFile.get('fileName')}
                    leftIcon={fileAuthorAvatar}
                    secondaryText={immFile.get('fileAuthor')}
                    onClick={() => this.handleDocClick(immFile)}
                />
            </div>
        );
    }

    buildRows() {
        const { immHistoryModal } = this.props;

        const style = {
            border: '1px solid rgb(217, 217, 217)',
            textAlign: 'left',
            overflowY: 'auto',
            height: '195px',
            marginBottom: '20px'
        };

        let rows;

        if (immHistoryModal.get('docHistory').isEmpty()) {
            rows = (
                <div>
                    <Divider/>
                    <ListItem
                        primaryText="No documents in history"
                        secondaryText="You don't have any documents in your history. Try loading some and come back!"
                        disabled={true}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            );
        } else if (immHistoryModal.get('filterDocs').isEmpty()) {
            rows = (
                <div>
                    <Divider/>
                    <ListItem
                        primaryText="Not found"
                        secondaryText="No documents were found"
                        disabled={true}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            );
        } else {
            rows = this.props.immHistoryModal.get('filterDocs').map(this.buildRow);
        }

        return (
            <List style={style}>
                <Subheader>Documents</Subheader>
                <Divider/>
                {rows}
            </List>
        );
    }

    buildFilterInput() {
        if (!this.props.immHistoryModal.get('docHistory').isEmpty()) {
            return (
                <TextField
                    hintText="Search file for name or author"
                    floatingLabelText="Search file"
                    fullWidth={true}
                    value={this.props.immHistoryModal.get('filter')}
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
                open={this.props.immHistoryModal.get('modalIsOpen')}
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

export const HistoryModalComponent = connect<HistoryModalStateToProp, HistoryModalActionToProp>(
    (state: RootState) => ({
        immHistoryModal: state.historyModal
    }),
    {
        onCloseModal: closeModal,
        onChangeFilter: filter,
        fetchDocument
    }
)(HistoryModal);
