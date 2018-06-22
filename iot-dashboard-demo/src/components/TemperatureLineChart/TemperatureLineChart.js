import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observer } from 'mobx-react';
import openSocket from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';

class TemperatureLineChart extends Component {

    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this)
        const dataService = openSocket('http://localhost:5000/user');

        dataService.on('new-data', (event) => this.addData(event.temp1, event.temp2));

        dataService.on('error', (error) => {
            console.log(error);
        });
    }

    addData(temp1, temp2) {
        let data = this.props.dataStore.data;
        if (data.length >= 30) {
            data = data.slice(1, 30);
        }
        data.push({
            name: new Date().toISOString().substring(11, 20),
            Room1: data[data.length - 1].Room1 + temp1,
            Room2: data[data.length - 1].Room2 + temp2,
        });
        this.props.dataStore.setData(data);
    };

    render() {
        return (
            <Paper style={{ width: '600px', height: '330px', margin: '20px 20px 20px 20px', padding: '5px', paddingTop: '10px' }}>
                <FormLabel component="legend">
                    {this.props.title}
                </FormLabel>
                <LineChart width={600} height={300} data={this.props.dataStore.data}
                    margin={{ top: 10, right: 30, left: -30, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="Room1" name="Room 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="Room2" name="Room 2" stroke="#0084d8" activeDot={{ r: 8 }} />
                </LineChart>
            </Paper >
        );
    }
}

export default observer(TemperatureLineChart);
