import { client, loadClient } from '@src/util/googleApi';

function loadPlus() {
    return loadClient('plus', 'v1');
}

export function getUser() {
    return loadPlus().then(() => client().plus.people.get({ userId: 'me' }));
}
