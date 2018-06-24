import React, { Component } from 'react';
import { LineChart, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';

class TemperatureLineChart extends Component {

    render() {
        return (
            <Paper style={{ width: '600px', height: '330px', margin: '20px 20px 20px 20px', padding: '5px', paddingTop: '10px' }}>
                <FormLabel component="legend">
                    {this.props.title}
                </FormLabel>
                <LineChart width={600} height={300} data={this.props.data}
                    margin={{ top: 10, right: 30, left: -30, bottom: 5 }}>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {this.props.children}
                </LineChart>
            </Paper >
        );
    }
}

export default TemperatureLineChart;
