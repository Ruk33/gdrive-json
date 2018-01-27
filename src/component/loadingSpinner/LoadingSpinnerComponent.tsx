// @vendors
import * as React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

export class LoadingSpinnerComponent extends React.Component {
    render() {
        const style = {
            display: 'inline-block',
            textAlign: 'center',
            height: 40,
            width: 40,
            padding: 10,
            margin: 0
        };

        return (
            <div style={{ textAlign: 'center' }}>
                <Paper style={style} zDepth={3} circle={true}>
                    <CircularProgress size={20} thickness={4} />
                </Paper>
            </div>
        );
    }
}
