import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus } from '../components'
import { dataStore } from '../stores'
import { Line, ReferenceLine } from 'recharts';
import { observer } from 'mobx-react';

class Room1Page extends Component {

    render() {
        const meanTemp1 = dataStore.meanTemperature1;
        const data = dataStore.temp1Data.slice();
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <TemperatureLineChart data={data} title={"Temperature"} >
                        <ReferenceLine y={meanTemp1} label="" stroke="#8884ee" strokeDasharray="5 5" />
                        <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </TemperatureLineChart>
                    <LedStatus dataStore={dataStore} showLedRoom1 />
                </div>
                <EventTable dataStore={dataStore.eventDataRoom1} />
            </div>
        );
    }
}

export default observer(Room1Page);
