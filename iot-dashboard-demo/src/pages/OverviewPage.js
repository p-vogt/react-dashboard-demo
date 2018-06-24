import React, { Component } from 'react';
import { TemperatureLineChart, LedStatus } from '../components'
import { dataStore } from '../stores'
import { Line } from 'recharts';

class OverviewPage extends Component {

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TemperatureLineChart dataStore={dataStore} title={"Temperature"} >
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="value2" name="Room 2" stroke="#0084d8" activeDot={{ r: 8 }} />
                </TemperatureLineChart>
                <LedStatus dataStore={dataStore} showLedRoom1 showLedRoom2/>
            </div>
        );
    }
}

export default OverviewPage;
