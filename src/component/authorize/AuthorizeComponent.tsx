import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@src/store';
import { LoginModalComponent } from '@src/component/loginModal/LoginModalComponent';
import { useSession } from './AuthorizeAction';

interface AuthorizeComponentProperty {
    immAuthorize: any;
    useSession: () => void;
    children: React.ReactNode;
}

interface AuthorizeStateToProp {
    immAuthorize: any;
}

interface AuthorizeActionToProp {
    useSession: () => void;
}

class Authorize extends React.Component<AuthorizeComponentProperty> {
    componentDidMount() {
        this.props.useSession();
    }

    render() {
        if (this.props.immAuthorize.get('isAuth')) {
            return this.props.children;
        } else {
            return <LoginModalComponent/>;
        }
    }
}

export const AuthorizeComponent = connect<AuthorizeStateToProp, AuthorizeActionToProp>(
    (state: RootState) => ({
        immAuthorize: state.authorize
    }),
    {
        useSession
    }
)(Authorize);
