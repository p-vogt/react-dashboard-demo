import React, { Component } from 'react';

import { observer } from 'mobx-react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

class LedStatus extends Component {

    handleClick = (id, event) => {
        if(id === 1) {
            this.props.dataStore.setLed1Status(!this.props.dataStore.led1Status)
        } else if(id === 2) {
            console.log(this.props.dataStore.led2Status)
            this.props.dataStore.setLed2Status(!this.props.dataStore.led2Status)
        }
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
                                        onClick={(event) => this.handleClick(1, event)}
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
                                        onClick={(event) => this.handleClick(2, event)}
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
