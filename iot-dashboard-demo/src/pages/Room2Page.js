import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus, SensorValue } from '../components'
import { dataStore, appDataStore } from '../stores'
import { Line, ReferenceLine } from 'recharts';
import { observer } from 'mobx-react';

class Room2Page extends Component {

    componentDidMount = () => {
        appDataStore.setPageTitle("Room 2")
    }

    render() {
        const meanTemp2 = dataStore.meanTemperature2;
        const data = dataStore.temp2Data.slice();
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <TemperatureLineChart data={data} title={"Temperature"} >
                        <ReferenceLine y={meanTemp2} label="" stroke="#0084ee" strokeDasharray="5 5" />
                        <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 2" stroke="#0084d8" activeDot={{ r: 8 }} />
                    </TemperatureLineChart>
                    <div style={{ height: "300px", display: "flex", flexWrap: "wrap" }}>
                        <LedStatus dataStore={dataStore} showLedRoom2 />
                        <SensorValue value={meanTemp2.toFixed(1)} title={"Mean Temp"}  unit="°C" />
                        <SensorValue value={dataStore.brightness} title={"Brightness"} unit="lx" />
                    </div>
                </div>
                <EventTable dataStore={dataStore.eventsRoom2} />
            </div>
        );
    }
}

export default observer(Room2Page);
