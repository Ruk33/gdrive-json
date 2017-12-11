import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { TopBarUserComponent } from '@src/component/topBarUser/TopBarUserComponent';
import { AuthorizeComponent } from '@src/component/authorize/AuthorizeComponent';
import { JsonEditorSectionComponent } from '@src/component/jsonEditorSection/JsonEditorSectionComponent';
import { getParamFromUrl } from '@src/util/urlParams';
import { LogoutButtonComponent } from '@src/component/logoutButton/LogoutButtonComponent';

export default class App extends React.Component {
    render() {
        const documentId = getParamFromUrl('document');

        return (
            <MuiThemeProvider>
                <AuthorizeComponent>
                    <LogoutButtonComponent/>
                    <TopBarUserComponent/>
                    <JsonEditorSectionComponent documentId={documentId}/>
                </AuthorizeComponent>
            </MuiThemeProvider>
        );
    }
}
