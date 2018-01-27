export interface Permission {
    name: string;
    emailAddress: string;
    photoLink: string;
    role: string;
}

export const getOwner = (permissions: Permission[]) =>
    permissions.find(x => x.role === 'owner');

export function fileIdFromUrl(url: string): string {
    const fileId = url.match(/[-\w]{25,}/);

    if (fileId) {
        return fileId[0];
    } else {
        return url;
    }
}
