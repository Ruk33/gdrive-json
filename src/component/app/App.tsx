// @vendors
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// @utils
import { getParamFromUrl } from '@src/util/urlParams';

// @components
import { TopBarUserComponent } from '@src/component/topBarUser/TopBarUserComponent';
import { AuthorizeComponent } from '@src/component/authorize/AuthorizeComponent';
import { JsonEditorSectionComponent } from '@src/component/jsonEditorSection/JsonEditorSectionComponent';
import { LogoutButtonComponent } from '@src/component/logoutButton/LogoutButtonComponent';

export default class App extends React.Component {
    render() {
        const documentId = getParamFromUrl('document');

        return (
            <MuiThemeProvider>
                <AuthorizeComponent>
                    <LogoutButtonComponent />
                    <TopBarUserComponent />
                    <JsonEditorSectionComponent documentId={documentId} />
                </AuthorizeComponent>
            </MuiThemeProvider>
        );
    }
}
