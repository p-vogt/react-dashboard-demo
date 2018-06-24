import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus } from '../components'
import { dataStore } from '../stores'
import { Line, ReferenceLine } from 'recharts';
import { observer } from 'mobx-react';

class Room2Page extends Component {

    render() {
        const meanTemp2 = dataStore.temp2Data;
        const data = dataStore.temp2Data.slice();
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <TemperatureLineChart data={data} title={"Temperature"} >
                        <ReferenceLine y={meanTemp2} label="" stroke="#0084ee" strokeDasharray="5 5" />
                        <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 2" stroke="#0084d8" activeDot={{ r: 8 }} />
                    </TemperatureLineChart>
                    <LedStatus dataStore={dataStore} showLedRoom2 />
                </div>
                <EventTable dataStore={dataStore.eventDataRoom2} />
            </div>
        );
    }
}

export default observer(Room2Page);
