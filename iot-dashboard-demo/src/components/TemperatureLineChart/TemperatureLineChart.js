import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import openSocket from 'socket.io-client';
import Paper from '@material-ui/core/Paper';

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
            { name: 'Page A', Room1: 30, Room2: 25 },
            { name: 'Page A', Room1: 31, Room2: 25 },
            { name: 'Page A', Room1: 32, Room2: 25 },
            { name: 'Page A', Room1: 33, Room2: 25 },
            { name: 'Page A', Room1: 29, Room2: 25 },
            { name: 'Page A', Room1: 28, Room2: 25 },
            { name: 'Page A', Room1: 31, Room2: 25 },
            { name: 'Page A', Room1: 33, Room2: 25 },
            { name: 'Page A', Room1: 30, Room2: 25 },
            { name: 'Page A', Room1: 35, Room2: 25 },
            { name: 'Page A', Room1: 30, Room2: 25 },
            { name: 'Page A', Room1: 34, Room2: 25 },
            { name: 'Page A', Room1: 35, Room2: 25 },
            { name: 'Page A', Room1: 32, Room2: 25 },
            { name: 'Page A', Room1: 28, Room2: 25 },
            { name: 'Page A', Room1: 27, Room2: 25 },
            { name: 'Page A', Room1: 26, Room2: 25 },
            { name: 'Page A', Room1: 25, Room2: 25 },
            { name: 'Page A', Room1: 29, Room2: 25 },
            { name: 'Page A', Room1: 30, Room2: 25 },
            { name: 'Page A', Room1: 29, Room2: 25 },
            { name: 'Page A', Room1: 35, Room2: 25 },
            { name: 'Page A', Room1: 34, Room2: 25 },
            { name: 'Page A', Room1: 31, Room2: 25 },
            { name: 'Page A', Room1: 32, Room2: 25 },
            { name: 'Page A', Room1: 33, Room2: 25 },
            { name: 'Page A', Room1: 30, Room2: 25 },
            { name: 'Page A', Room1: 28, Room2: 25 },
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
            <Paper style={{ width: '600px', margin: '10px 10px 10px 20px' }}>
                <h1>
                    Temperature
                </h1>
                <LineChart width={600} height={300} data={this.state.data}
                    style={{ marginLeft: '-30px', marginTop: '-20px' }}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" animationDuration={0} dataKey="Room1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" animationDuration={0} dataKey="Room2" stroke="#0084d8" activeDot={{ r: 8 }} />
                </LineChart>
            </Paper>
        );
    }
}

export default TemperatureLineChart;
