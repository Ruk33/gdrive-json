// @vendors
import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

// @components
import { TopBarUserState } from '@src/component/topBarUser/TopBarUserState';
import { AuthorizeState } from '@src/component/authorize/AuthorizeState';

// @stores
import { RootState } from '@src/store';

// @actions
import { fetch } from './TopBarUserAction';

const jsonIcon = require('./jsonIcon.svg');

interface TopBarUserProperty {
    topBarUserState: TopBarUserState;
    authorizeState: AuthorizeState;
    fetchUser: () => void;
}

interface TopBarUserStateToProp {
    topBarUserState: TopBarUserState;
    authorizeState: AuthorizeState;
}

interface TopBarUserActionToProp {
    fetchUser: () => void;
}

class TopBarUser extends React.Component<TopBarUserProperty> {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <AppBar
                title="JSON Viewer"
                iconElementLeft={<img src={jsonIcon} width="40" height="40" />}
                style={{ backgroundColor: '#263238' }}
            />
        );
    }
}

export const TopBarUserComponent = connect<
    TopBarUserStateToProp,
    TopBarUserActionToProp
>(
    (state: RootState) => ({
        topBarUserState: state.topBarUser,
        authorizeState: state.authorize
    }),
    {
        fetchUser: fetch
    }
)(TopBarUser);
