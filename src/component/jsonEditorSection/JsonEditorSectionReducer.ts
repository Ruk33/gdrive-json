// @actions
import { Action, ActionType } from './JsonEditorSectionAction';

// @states
import { JsonEditorSectionState } from './JsonEditorSectionState';
import { ImmutableJsonEditorSectionState } from './ImmutableJsonEditorSectionState';

export function jsonEditorSectionReducer(
    state: JsonEditorSectionState = ImmutableJsonEditorSectionState.initialState,
    action: Action
): JsonEditorSectionState {
    switch (action.type) {
        case ActionType.JSON_EDITOR_SECTION_RESET:
            return ImmutableJsonEditorSectionState.initialState;
        case ActionType.JSON_EDITOR_SECTION_CLOSE_NEW_DOCUMENT_POPUP:
            return new ImmutableJsonEditorSectionState(
                state
            ).closeNewDocumentModal();
        case ActionType.JSON_EDITOR_SECTION_OPEN_NEW_DOCUMENT_POPUP:
            return new ImmutableJsonEditorSectionState(
                state
            ).openNewDocumentModal();
        case ActionType.JSON_EDITOR_SECTION_FETCHING:
            return new ImmutableJsonEditorSectionState(state).startFetching();
        case ActionType.JSON_EDITOR_SECTION_FETCHING_SUCCESS:
            return new ImmutableJsonEditorSectionState(state).fetchingSuccess(
                action
            );
        case ActionType.JSON_EDITOR_SECTION_FETCHING_ERROR:
            const error = action.payload.error.message;
            return new ImmutableJsonEditorSectionState(state).fetchingError(
                error
            );
        default:
            return state;
    }
}
