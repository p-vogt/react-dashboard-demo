import React, { Component } from 'react';

import { observer } from 'mobx-react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

class LedStatus extends Component {

    handleChange() {

    }
    render() {
        const { led1Status, led2Status } = this.props.dataStore;

        return (
            <Paper style={{ height: '100px', margin: '20px 20px 20px 0px', padding: '10px' }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Lights</FormLabel>
                    <FormGroup>
                        {this.props.showLedRoom1 ?
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={led1Status}
                                        onChange={this.handleChange(1)}
                                        value="ledRoom1"
                                    />
                                }
                                label="Room 1"
                            />
                            : null
                        }
                        {this.props.showLedRoom2 ?
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={led2Status}
                                        onChange={this.handleChange(2)}
                                        value="ledRoom2"
                                    />
                                }
                                label="Room 2"
                            />
                            : null
                        }

                    </FormGroup>
                </FormControl>
            </Paper>
        );
    }
}

export default observer(LedStatus);
