import * as React from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

import { RootState } from '@src/store';
import { logout } from '@src/component/authorize/AuthorizeAction';

interface LogoutButtonProperty {
    userName: string;
    userAvatar: string;
    onLogoutClick: () => void;
}

interface LogoutButtonStateToProp {
    userName: string;
    userAvatar: string;
}

interface LogoutButtonActionToProp {
    onLogoutClick: () => void;
}

class LogoutButton extends React.Component<LogoutButtonProperty> {
    buildAvatar() {
        return <Avatar src={this.props.userAvatar} size={30}/>;
    }

    render() {
        if (this.props.userName) {
            const avatar = this.buildAvatar();
            const buttonLabel = `Logout, ${this.props.userName}`;

            return (
                <FlatButton
                    backgroundColor="#EF6C00"
                    hoverColor="#F57C00"
                    icon={avatar}
                    label={buttonLabel}
                    labelPosition="before"
                    onClick={this.props.onLogoutClick}
                    style={{
                        position: 'absolute',
                        color: 'white',
                        top: '15px',
                        right: '10px',
                        zIndex: '9999'
                    }}
                />
            );
        } else {
            return null;
        }
    }
}

export const LogoutButtonComponent = connect<LogoutButtonStateToProp, LogoutButtonActionToProp>(
    (state: RootState) => ({
        userName: state.topBarUser.get('displayName'),
        userAvatar: state.topBarUser.get('avatar')
    }),
    {
        onLogoutClick: logout
    }
)(LogoutButton);
