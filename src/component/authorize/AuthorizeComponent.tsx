// @vendors
import * as React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

// @stores
import { RootState } from '@src/store';

// @components
import { LoginModalComponent } from '@src/component/loginModal/LoginModalComponent';

// @actions
import { useSession } from './AuthorizeAction';

// @states
import { AuthorizeState } from './AuthorizeState';

interface AuthorizeComponentProperty {
    authorizeState: AuthorizeState;
    useSession: () => void;
    children: React.ReactNode;
}

interface AuthorizeStateToProp {
    authorizeState: AuthorizeState;
}

interface AuthorizeActionToProp {
    useSession: () => void;
}

class Authorize extends React.Component<AuthorizeComponentProperty> {
    componentDidMount() {
        this.props.useSession();
    }

    render() {
        const { authorizeState } = this.props;

        if (authorizeState.isAuth) {
            return this.props.children;
        } else {
            return (
                <section>
                    <Snackbar
                        open={!!authorizeState.error}
                        message={authorizeState.error}
                        autoHideDuration={5000}
                    />
                    <LoginModalComponent />
                </section>
            );
        }
    }
}

export const AuthorizeComponent = connect<
    AuthorizeStateToProp,
    AuthorizeActionToProp
>(
    (state: RootState) => ({
        authorizeState: state.authorize
    }),
    {
        useSession
    }
)(Authorize);
