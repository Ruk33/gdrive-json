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
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface JsonEditorHeaderComponentProperty {
    fileName: string;
    fileAuthorName: string;
    fileAuthorEmail: string;
    fileAuthorAvatar: string;
    loadNewDocument: () => void;
    onOpenHistoryModal: () => void;
    onFormatDocument: () => void;
    onOpenSearchDialog: () => void;
}

interface JsonEditorHeaderComponentState {
    copySnackbackVisible: boolean;
}

export class JsonEditorHeaderComponent extends React.Component<JsonEditorHeaderComponentProperty, JsonEditorHeaderComponentState> {
    constructor(props) {
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
                />
                <MenuItem
                    primaryText="Format file"
                    leftIcon={<EditorFormatPaint/>}
                    onClick={this.props.onFormatDocument}
                />
                <CopyToClipboard
                    onCopy={this.displayCopySnackbar}
                    text={shareLink}
                >
                    <MenuItem
                        primaryText="Copy share link"
                        leftIcon={<SocialShare/>}
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
                    onClick={this.props.loadNewDocument}
                />
            </IconMenu>
        );
    }

    render() {
        const { fileName, fileAuthorEmail, fileAuthorName, fileAuthorAvatar } = this.props;
        const subtitleLabel = `Uploaded by ${fileAuthorName} <${fileAuthorEmail}>`;

        return (
            <CardHeader
                title={fileName}
                subtitle={subtitleLabel}
                avatar={fileAuthorAvatar}
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
