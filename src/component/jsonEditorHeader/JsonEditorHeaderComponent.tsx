import * as React from 'react';
import { CardHeader } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ActionHistory from 'material-ui/svg-icons/action/history';
import SocialShare from 'material-ui/svg-icons/social/share';
import ContentLink from 'material-ui/svg-icons/content/link';
import ActionSearch from 'material-ui/svg-icons/action/search';
import EditorFormatPaint from 'material-ui/svg-icons/editor/format-paint';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface JsonEditorHeaderComponentProperty {
    fileName: string;
    fileAuthorName: string;
    fileAuthorEmail: string;
    fileAuthorAvatar: string;
    fileIsFetched: boolean;
    onLoadNewDocumentClick: () => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: () => void;
    onOpenSearchDialog: () => void;
}

interface JsonEditorHeaderComponentState {
    copySnackbackVisible: boolean;
}

export class JsonEditorHeaderComponent extends React.Component<JsonEditorHeaderComponentProperty, JsonEditorHeaderComponentState> {
    constructor(props: JsonEditorHeaderComponentProperty) {
        super(props);

        this.state = { copySnackbackVisible: false };

        this.displayCopySnackbar = this.displayCopySnackbar.bind(this);
        this.hideCopySnackbar = this.hideCopySnackbar.bind(this);
        this.buildMenu = this.buildMenu.bind(this);
    }

    displayCopySnackbar() {
        this.setState({ copySnackbackVisible: true });
    }

    hideCopySnackbar() {
        this.setState({ copySnackbackVisible: false });
    }

    buildMenu() {
        const menuButton = (
            <FlatButton
                label="Menu"
                labelPosition="before"
                icon={<MenuIcon/>}
                backgroundColor="#37474F"
                hoverColor="#455A64"
                style={{ color: 'white' }}
            />
        );

        const shareLink = document.location.href;

        return (
            <IconMenu
                style={{ color: 'white' }}
                iconButtonElement={menuButton}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem
                    primaryText="Search in file"
                    leftIcon={<ActionSearch/>}
                    onClick={this.props.onOpenSearchDialog}
                    disabled={!this.props.fileIsFetched}
                />
                <MenuItem
                    primaryText="Format file"
                    leftIcon={<EditorFormatPaint/>}
                    onClick={this.props.onFormatDocument}
                    disabled={!this.props.fileIsFetched}
                />
                <CopyToClipboard
                    onCopy={this.displayCopySnackbar}
                    text={shareLink}
                >
                    <MenuItem
                        primaryText="Copy share link"
                        leftIcon={<SocialShare/>}
                        disabled={!this.props.fileIsFetched}
                    />
                </CopyToClipboard>
                <Divider/>
                <MenuItem
                    primaryText="Open your history"
                    leftIcon={<ActionHistory/>}
                    onClick={this.props.onOpenHistoryModal}
                />
                <MenuItem
                    primaryText="Load new document"
                    leftIcon={<ContentLink/>}
                    onClick={this.props.onLoadNewDocumentClick}
                />
            </IconMenu>
        );
    }

    render() {
        const {
            fileName,
            fileAuthorEmail,
            fileAuthorName,
            fileAuthorAvatar,
            fileIsFetched
        } = this.props;

        const placeHolderStyle = {
            width: '600px',
            height: '15px',
            marginTop: '4px',
            marginBottom: '6px'
        };

        const fileNameLabel =
            fileIsFetched ?
            <div style={placeHolderStyle}>{fileName}</div> :
            <LinearProgress mode="indeterminate" color="#c3c3c3" style={placeHolderStyle}/>;

        const subtitleLabel =
            fileIsFetched ?
            <div style={placeHolderStyle}>{`Uploaded by ${fileAuthorName} <${fileAuthorEmail}>`}</div> :
            <LinearProgress mode="indeterminate" color="#c3c3c3" style={placeHolderStyle}/>;

        return (
            <CardHeader
                title={fileNameLabel}
                subtitle={subtitleLabel}
                avatar={fileAuthorAvatar}
                style={{ height: '76px' }}
            >
                <Snackbar
                    open={this.state.copySnackbackVisible}
                    message="Share link copied to your clipboard!"
                    autoHideDuration={5000}
                    onRequestClose={this.hideCopySnackbar}
                />
                <div style={{ position: 'absolute', top: '20px', right: '10px' }}>
                    {this.buildMenu()}
                </div>
            </CardHeader>
        );
    }
}
