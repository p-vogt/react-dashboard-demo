import React, { Component } from 'react';
import { TemperatureLineChart } from '../components'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { dataStore } from '../stores'
class OverviewPage extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleChange() {

    }
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TemperatureLineChart dataStore={dataStore} title={"Temperature"} />
                <Paper style={{ height: '100px', margin: '20px 20px 20px 0px', padding: '10px' }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Lights</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.ledRoom1}
                                        onChange={this.handleChange(1)}
                                        value="ledRoom1"
                                    />
                                }
                                label="Room 1"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.ledRoom2}
                                        onChange={this.handleChange(2)}
                                        value="ledRoom2"
                                    />
                                }
                                label="Room 2"
                            />
                        </FormGroup>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

export default OverviewPage;
