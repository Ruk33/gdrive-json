declare const gapi: any;

export function client() {
    return gapi.client;
}

export function loadClient(...args) {
    return client().load.apply(client(), args);
}

function loadClientLibrary(libraries: string) {
    return new Promise((resolve, reject) => {
        gapi.load(libraries, {
            callback: resolve,
            onerror: reject,
            ontimeout: reject,
            timeout: 5000
        });
    });
}

export function logout() {
    return gapi.auth2.getAuthInstance().signOut();
}

function signIn(authStatusListener: (isAuth) => void, openLoginWindowIfNotAuth) {
    const isAuth = gapi.auth2.getAuthInstance().isSignedIn.get();

    gapi.auth2.getAuthInstance().isSignedIn.listen(authStatusListener);

    if (isAuth) {
        return Promise.resolve();
    } else if (openLoginWindowIfNotAuth) {
        return gapi.auth2.getAuthInstance().signIn();
    } else {
        return Promise.reject(0);
    }
}

function initClient() {
    const scopes = [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
    ];

    const config = {
        apiKey: 'AIzaSyCKBsoQaLMBLOxg_8w-x8vciSmgxQEzf2Y',
        clientId: '156826481144-uq59gul0npm3j3sfc8jbijfq247vsj9t.apps.googleusercontent.com',
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/drive/v2/rest'
        ],
        scope: scopes.join(' ')
    };

    return client().init(config);
}

export function loginWithSession(authStatusListener: (isAuth) => void) {
    return loadClientLibrary('client:auth2')
        .then(initClient)
        .then(() => signIn(authStatusListener, false));
}

export function login(authStatusListener: (isAuth) => void) {
    return loadClientLibrary('client:auth2')
        .then(initClient)
        .then(() => signIn(authStatusListener, true));
}
