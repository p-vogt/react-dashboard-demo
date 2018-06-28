import React from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';

const SensorValue = (props) => (
    <Paper style={{ height: '100px', margin: '20px 20px 20px 0px', padding: '10px' }}>
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.title}</FormLabel>
            <FormGroup style={{fontSize: "1.25em", verticalAlign: "center", textAlign: "center"}}>
                <div style={{lineHeight: "90px"}}> {props.value} {props.unit} </div>
            </FormGroup>
        </FormControl>
    </Paper>
)

export default SensorValue;
