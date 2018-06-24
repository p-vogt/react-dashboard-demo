import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus } from '../components'
import { dataStore } from '../stores'
import { Line } from 'recharts';

class Room1Page extends Component {

    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <TemperatureLineChart dataStore={dataStore} title={"Temperature"} >
                        <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </TemperatureLineChart>
                    <LedStatus dataStore={dataStore} showLedRoom1 />
                </div>
                <EventTable dataStore={dataStore.eventDataRoom1} />
            </div>
        );
    }
}

export default Room1Page;
