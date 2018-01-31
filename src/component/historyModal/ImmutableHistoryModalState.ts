// @vendors
import { Record, List } from 'immutable';

// @states
import {
    HistoryModalState,
    HistoryDocument,
    initialState
} from './HistoryModalState';

export class ImmutableHistoryModalState extends Record(initialState)
    implements HistoryModalState {
    static readonly initialState: HistoryModalState = new ImmutableHistoryModalState(
        initialState
    );

    static readonly LOCAL_STORAGE_HISTORY_KEY: string = 'jsonViewer.history';

    readonly modalIsOpen: boolean;
    readonly filterTerm: string;
    readonly docHistory: List<HistoryDocument>;
    readonly filterDocs: List<HistoryDocument>;

    constructor(props: HistoryModalState) {
        super(props);
    }

    updateFilter(newFilterTerm: string): HistoryModalState {
        const displayAllDocuments: boolean = newFilterTerm.length === 0;
        let filterDocuments: List<HistoryDocument>;

        if (displayAllDocuments) {
            filterDocuments = this.docHistory;
        } else {
            filterDocuments = this.filterHistoryDocumentsByTerm(newFilterTerm);
        }

        return this.merge({
            filterTerm: newFilterTerm,
            filterDocs: filterDocuments
        }) as this;
    }

    openHistoryModal(): HistoryModalState {
        return this.merge({ modalIsOpen: true }) as this;
    }

    closeHistoryModal(): HistoryModalState {
        return this.merge({ modalIsOpen: false }) as this;
    }

    loadHistoryFromSession(): HistoryModalState {
        let documentsFromSession: string | null;
        let documents: List<HistoryDocument>;

        try {
            documentsFromSession =
                localStorage.getItem(
                    ImmutableHistoryModalState.LOCAL_STORAGE_HISTORY_KEY
                ) || '[]';
            documents = List(JSON.parse(documentsFromSession));
        } catch (e) {
            documents = List([]);
        }

        return this.merge({
            docHistory: documents,
            filterDocs: documents
        }) as this;
    }

    resetHistory(): HistoryModalState {
        const documents: List<HistoryDocument> = List([]);

        localStorage.removeItem(
            ImmutableHistoryModalState.LOCAL_STORAGE_HISTORY_KEY
        );
        return this.merge({
            docHistory: documents,
            filterDocs: documents
        }) as this;
    }

    addDocumentOnTopOfHistory(newDocument: HistoryDocument): HistoryModalState {
        const documentsInHistoryWithoutNewDocument: List<
            HistoryDocument
        > = this.filterHistoryDocumentsWithId(newDocument.fileId);

        const documentsInHistoryWithNewDocumentOnTop: List<
            HistoryDocument
        > = documentsInHistoryWithoutNewDocument.unshift(newDocument);

        localStorage.setItem(
            ImmutableHistoryModalState.LOCAL_STORAGE_HISTORY_KEY,
            JSON.stringify(documentsInHistoryWithNewDocumentOnTop.toJS())
        );

        return this.merge({
            docHistory: documentsInHistoryWithNewDocumentOnTop,
            filterDocs: documentsInHistoryWithNewDocumentOnTop
        }) as this;
    }

    private documentNameOrAuthorContainsFilterTerm(
        document: HistoryDocument,
        filterTerm: string
    ) {
        const { fileName, fileAuthor } = document;

        const lowerCaseFilter = filterTerm.toLowerCase();

        const fileNameContainsFilter = fileName
            .toLowerCase()
            .includes(lowerCaseFilter);
        const fileAuthorContainsFilter = fileAuthor
            .toLowerCase()
            .includes(lowerCaseFilter);

        return fileNameContainsFilter || fileAuthorContainsFilter;
    }

    private filterHistoryDocumentsByTerm(filterTerm: string) {
        const documentsContainingTerm = this.docHistory.filter(
            (document: HistoryDocument) => {
                return this.documentNameOrAuthorContainsFilterTerm(
                    document,
                    filterTerm
                );
            }
        );

        return documentsContainingTerm.toList();
    }

    private filterHistoryDocumentsWithId(fileId: string) {
        const documentsWithoutId = this.docHistory.filter(
            (document: HistoryDocument) => {
                return document.fileId !== fileId;
            }
        );

        return documentsWithoutId.toList();
    }
}
