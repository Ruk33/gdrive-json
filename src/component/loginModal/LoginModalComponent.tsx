import * as React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionInput from 'material-ui/svg-icons/action/input';
import { fullWhite } from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { openLoginWindow } from './LoginModalAction';

interface LoginModalProperty {
    openLoginWindow: () => void;
}

interface LoginModalActionToProp {
    openLoginWindow: () => void;
}

class LoginModal extends React.Component<LoginModalProperty> {
    render() {
        return (
            <Dialog modal={true} open={true} style={{ textAlign: 'center' }}>
                <Card>
                    <CardTitle
                        title="Welcome to JSONViewer!"
                        subtitle="Please login using your Google account"
                    />
                    <CardText>
                        <FlatButton
                            backgroundColor="#D84315"
                            hoverColor="#E64A19"
                            icon={<ActionInput color={fullWhite} />}
                            label="Login with Google"
                            style={{ color: 'white' }}
                            onClick={this.props.openLoginWindow}
                        />
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}

export const LoginModalComponent = connect<void, LoginModalActionToProp>(
    null,
    {
        openLoginWindow
    }
)(LoginModal);
