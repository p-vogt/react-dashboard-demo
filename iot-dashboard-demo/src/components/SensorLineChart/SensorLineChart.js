import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import openSocket from 'socket.io-client';

class TemperatureLineChart extends Component {

    constructor(props) {
        super(props);

            const dataService = openSocket('http://localhost:5000/user');
        
            dataService.on('new-data', (val) => this.addData(val));
        
            dataService.on('error', (error) => {
              console.log(error);
            });

        let data = [
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
            { name: 'Page A', temp1: 30, temp2: 25 },
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
        temp1: data[data.length - 1].temp1 + val,
    });
    this.setState({ data });
};

render() {
    return (
        <LineChart width={600} height={300} data={this.state.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" animationDuration={10000000} dataKey="temp1" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" animationDuration={10000000} dataKey="temp2" stroke="#0084d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}
}

export default TemperatureLineChart;
