import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface JsonEditorComponentProperty {
    fileContent: string;
    onEditorDidMount: (editor) => void;
    onFormatDocument: () => void;
    onInitialFormatDocument: () => void;
    onUpdateLayer: () => void;
}

interface JsonEditorComponentState {
    editorHeight: number;
}

export class JsonEditorComponent extends React.Component<JsonEditorComponentProperty, JsonEditorComponentState> {
    constructor(props: JsonEditorComponentProperty) {
        super(props);

        this.state = { editorHeight: 0 };

        this.editorDidMount = this.editorDidMount.bind(this);
        this.updateEditorHeight = this.updateEditorHeight.bind(this);
    }

    componentWillMount() {
        this.updateEditorHeight();
        window.addEventListener('resize', this.updateEditorHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateEditorHeight);
    }

    updateEditorHeight() {
        const headerHeight = 140;

        this.setState({ editorHeight: window.innerHeight - headerHeight });
        this.props.onUpdateLayer();
    }

    editorDidMount(editor, monaco) {
        this.props.onEditorDidMount(editor);
        this.props.onInitialFormatDocument();
    }

    render() {
        return (
            <div style={{ height: this.state.editorHeight + 'px', width: '100%', position: 'fixed' }}>
            <MonacoEditor
                language="json"
                theme="vs-dark"
                value={this.props.fileContent}
                editorDidMount={this.editorDidMount}
                options={{
                    contextmenu: false,
                    folding: true,
                    dragAndDrop: false,
                    minimap: false,
                    showFoldingControls: 'always'
                }}
            />
            </div>
        );
    }
}
