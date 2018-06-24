import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus } from '../components'
import { dataStore } from '../stores'
import { Line } from 'recharts';

class Room2Page extends Component {

    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <TemperatureLineChart dataStore={dataStore} title={"Temperature"} >
                        <Line type="monotone" dot={false} animationDuration={0} dataKey="value2" name="Room 2" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </TemperatureLineChart>
                    <LedStatus dataStore={dataStore} showLedRoom2 />
                </div>
                <EventTable dataStore={dataStore.eventDataRoom2} />
            </div>
        );
    }
}

export default Room2Page;
