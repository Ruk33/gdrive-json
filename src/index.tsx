import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from '@src/registerServiceWorker';
import { store } from '@src/store';

import App from '@src/component/app/App';

import './index.css';
import 'typeface-roboto';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
