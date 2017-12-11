export function getParamFromUrl(param: string) {
    const params = location.search.replace('?', '').split('&');
    const paramPrefix = param + '=';
    const result = params.find(x => x.startsWith(paramPrefix)) || '';

    return result.replace(paramPrefix, '');
}
