import * as React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionCode from 'material-ui/svg-icons/action/code';
import ActionHistory from 'material-ui/svg-icons/action/history';
import { fullWhite } from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { HistoryModalComponent } from '@src/component/historyModal/HistoryModalComponent';

interface DocumentInputProperty {
    onContinue: (fileId: string) => void;
    onOpenHistoryModal: () => void;
    errorMessage: string;
}

interface DocumentInputState {
    fileId: string;
}

export class DocumentInputComponent extends React.Component<DocumentInputProperty, DocumentInputState> {
    constructor(props) {
        super(props);

        this.state = { fileId: '' };

        this.onChange = this.onChange.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    onChange(event, newValue) {
        this.setState({ fileId: newValue });
    }

    onContinue() {
        this.props.onContinue(this.state.fileId);
    }

    render() {
        return (
            <Dialog modal={true} open={true} style={{ textAlign: 'center' }}>
                <HistoryModalComponent/>
                <Card>
                    <CardTitle
                        title="Welcome to JSONViewer!"
                        subtitle="Please insert a Google Doc link or search in your history to continue"
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
                            icon={<ActionHistory color={fullWhite} />}
                            label="Open history"
                            style={{ color: 'white', marginRight: '20px' }}
                            onClick={this.props.onOpenHistoryModal}
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
