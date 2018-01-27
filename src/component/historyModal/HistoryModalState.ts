// @vendors
import { List } from 'immutable';

export interface HistoryDocument {
    fileUrl: string;
    fileName: string;
    fileAuthor: string;
    fileAuthorAvatar: string;
    fileId: string;
}

export interface HistoryModalState {
    readonly modalIsOpen: boolean;
    readonly filterTerm: string;
    readonly docHistory: List<HistoryDocument>;
    readonly filterDocs: List<HistoryDocument>;
}

export const initialState: HistoryModalState = {
    modalIsOpen: false,
    filterTerm: '',
    docHistory: List([]),
    filterDocs: List([])
};
