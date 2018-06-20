import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import openSocket from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';

class TemperatureLineChart extends Component {

    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this)
        const dataService = openSocket('http://localhost:5000/user');

        dataService.on('new-data', (val) => this.addData(val));

        dataService.on('error', (error) => {
            console.log(error);
        });

        let data = [
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 31, Room2: 25 },
            { name: 'xxx', Room1: 32, Room2: 25 },
            { name: 'xxx', Room1: 33, Room2: 25 },
            { name: 'xxx', Room1: 29, Room2: 25 },
            { name: 'xxx', Room1: 28, Room2: 25 },
            { name: 'xxx', Room1: 31, Room2: 25 },
            { name: 'xxx', Room1: 33, Room2: 25 },
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 35, Room2: 25 },
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 34, Room2: 25 },
            { name: 'xxx', Room1: 35, Room2: 25 },
            { name: 'xxx', Room1: 32, Room2: 25 },
            { name: 'xxx', Room1: 28, Room2: 25 },
            { name: 'xxx', Room1: 27, Room2: 25 },
            { name: 'xxx', Room1: 26, Room2: 25 },
            { name: 'xxx', Room1: 25, Room2: 25 },
            { name: 'xxx', Room1: 29, Room2: 25 },
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 29, Room2: 25 },
            { name: 'xxx', Room1: 35, Room2: 25 },
            { name: 'xxx', Room1: 34, Room2: 25 },
            { name: 'xxx', Room1: 31, Room2: 25 },
            { name: 'xxx', Room1: 32, Room2: 25 },
            { name: 'xxx', Room1: 33, Room2: 25 },
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 28, Room2: 25 },
        ];
        this.state = {
            data
        }
    }

    addData(val) {
        let data = this.state.data.slice(0);
        if (data.length >= 30) {
            data = data.slice(1, 30);
        }
        data.push({
            name: new Date().toISOString().substring(11, 20),
            Room1: data[data.length - 1].Room1 + val,
        });
        this.setState({ data });
    };

    render() {
        return (
            <Paper style={{ width: '600px', height: '330px', margin: '20px 20px 20px 20px', padding: '5px', paddingTop: '10px' }}>
                <FormLabel component="legend">
                    {this.props.title}
                </FormLabel>
                <LineChart width={600} height={300} data={this.state.data}
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

export default TemperatureLineChart;
