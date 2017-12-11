import * as React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';

import { RootState } from '@src/store';
import { fetch } from './TopBarUserAction';

const jsonIcon = require('./jsonIcon.svg');

interface TopBarUserProperty {
    immTopBarUser: any;
    immAuthorize: any;
    fetchUser: () => void;
}

interface TopBarUserStateToProp {
    immTopBarUser: any;
    immAuthorize: any;
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
                iconElementLeft={<img src={jsonIcon} width="40" height="40"/>}
                style={{ backgroundColor: '#263238' }}
            />
        );
    }
}

export const TopBarUserComponent = connect<TopBarUserStateToProp, TopBarUserActionToProp>(
    (state: RootState) => ({
        immTopBarUser: state.topBarUser,
        immAuthorize: state.authorize
    }),
    {
        fetchUser: fetch
    }
)(TopBarUser);
