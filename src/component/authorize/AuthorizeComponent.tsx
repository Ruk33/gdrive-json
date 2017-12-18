import * as React from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';

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
        const { immAuthorize } = this.props;

        if (immAuthorize.get('isAuth')) {
            return this.props.children;
        } else {
            return (
                <section>
                    <Snackbar
                        open={!!immAuthorize.get('error')}
                        message={immAuthorize.get('error')}
                        autoHideDuration={5000}
                    />
                    <LoginModalComponent/>
                </section>
            );
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
