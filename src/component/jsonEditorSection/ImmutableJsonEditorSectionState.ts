// @vendors
import { Record } from 'immutable';
import { trim } from 'lodash';

// @utils
import { getOwner } from '@src/util/googleDriveFileHelper';

// @actions
import { FetchingSuccessAction } from './JsonEditorSectionAction';

// @states
import { JsonEditorSectionState, initialState } from './JsonEditorSectionState';

export class ImmutableJsonEditorSectionState extends Record(initialState)
    implements JsonEditorSectionState {
    static readonly initialState = new ImmutableJsonEditorSectionState(
        initialState
    );

    readonly fetching: boolean;
    readonly fetched: boolean;
    readonly popUpNewDocumentOpen: boolean;
    readonly fileName: string;
    readonly fileAuthorName: string;
    readonly fileAuthorEmail: string;
    readonly fileAuthorAvatar: string;
    readonly fileContent: string;
    readonly errorMessage: string;

    constructor(props: JsonEditorSectionState) {
        super(props);
    }

    openNewDocumentModal(): JsonEditorSectionState {
        return this.merge({ popUpNewDocumentOpen: true }) as this;
    }

    closeNewDocumentModal(): JsonEditorSectionState {
        return this.merge({
            popUpNewDocumentOpen: false,
            errorMessage: ''
        }) as this;
    }

    startFetching(): JsonEditorSectionState {
        return this.merge({ fetching: true }) as this;
    }

    fetchingSuccess(action: FetchingSuccessAction): JsonEditorSectionState {
        const owner = getOwner(action.payload.filePermissions);
        let fileContent = '';

        try {
            const spaces = 4;

            fileContent = JSON.stringify(
                JSON.parse(trim(action.payload.fileContent)),
                null,
                spaces
            );
        } catch (e) {
            fileContent = action.payload.fileContent;
        }

        return this.merge({
            popUpNewDocumentOpen: false,
            fetching: false,
            fetched: true,
            fileName: action.payload.fileInfo.title,
            fileAuthorName: owner ? owner.name : '?',
            fileAuthorEmail: owner ? owner.emailAddress : '',
            fileAuthorAvatar: owner ? owner.photoLink : '',
            errorMessage: '',
            fileContent
        }) as this;
    }

    fetchingError(error: string): JsonEditorSectionState {
        return this.merge({
            popUpNewDocumentOpen: true,
            fetching: false,
            errorMessage: `${error} (make sure you have privileges to access this file)`
        }) as this;
    }
}
