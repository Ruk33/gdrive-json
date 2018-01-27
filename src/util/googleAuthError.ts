export function getErrorMessageByCode(errorCode: string) {
    switch (errorCode) {
        case 'popup_blocked_by_browser':
            return 'Google login popup has been blocked, please enable popups';
        default:
            return '';
    }
}
