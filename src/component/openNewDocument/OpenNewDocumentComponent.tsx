// @vendors
import * as React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionCode from 'material-ui/svg-icons/action/code';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { fullWhite } from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';

interface OpenNewDocumentProperty {
    isOpen: boolean;
    onContinue: (fileId: string) => void;
    onClose: () => void;
    errorMessage: string;
}

interface OpenNewDocumentState {
    fileId: string;
}

export class OpenNewDocumentComponent extends React.Component<
    OpenNewDocumentProperty,
    OpenNewDocumentState
> {
    constructor(props: OpenNewDocumentProperty) {
        super(props);

        this.state = { fileId: '' };

        this.onChange = this.onChange.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    onChange(event, newValue: string) {
        this.setState({ fileId: newValue });
    }

    onContinue() {
        this.props.onContinue(this.state.fileId);
    }

    render() {
        return (
            <Dialog
                modal={true}
                open={this.props.isOpen}
                style={{ textAlign: 'center' }}
            >
                <Card>
                    <CardTitle
                        title="Open a new document"
                        subtitle="Please insert a Google Doc link"
                    />
                    <CardText>
                        <TextField
                            hintText="Ex: https://drive.google.com/open?id=1y-QMDSaePHR2RtGcV3WnafbfoFuQ3P72TAn5YbPRAWg"
                            floatingLabelText="Google Doc Link"
                            fullWidth={true}
                            onChange={this.onChange}
                            errorText={this.props.errorMessage}
                            style={{ textAlign: 'left', marginBottom: '20px' }}
                        />
                        <FlatButton
                            backgroundColor="#90A4AE"
                            hoverColor="#B0BEC5"
                            icon={<NavigationClose color={fullWhite} />}
                            label="Close"
                            style={{ color: 'white', marginRight: '20px' }}
                            onClick={this.props.onClose}
                        />
                        <FlatButton
                            backgroundColor="#D84315"
                            hoverColor="#E64A19"
                            icon={<ActionCode color={fullWhite} />}
                            label="Display as JSON"
                            style={{ color: 'white' }}
                            onClick={this.onContinue}
                        />
                    </CardText>
                </Card>
            </Dialog>
        );
    }
}
