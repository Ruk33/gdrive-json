import { client, loadClient } from '@src/util/googleApi';

function loadDrive(version: string) {
    return loadClient('drive', version);
}

export function getDocument(fileId: string) {
    return loadDrive('v2').then(() => client().drive.files.export({
        mimeType: 'text/plain',
        fileId
    }));
}

export function getDocumentPermissions(fileId: string) {
    return loadDrive('v2').then(() => client().drive.permissions.list({
        fileId
    }));
}

export function getDocumentInfo(fileId: string) {
    return loadDrive('v2').then(() => client().drive.files.get({
        fileId
    }));
}
