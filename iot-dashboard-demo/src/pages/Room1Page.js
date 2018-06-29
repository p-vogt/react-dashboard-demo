import React, { Component } from 'react';
import { TemperatureLineChart, EventTable, LedStatus, SensorValue } from '../components'
import { dataStore, appDataStore } from '../stores'
import { Line, ReferenceLine } from 'recharts';
import { observer } from 'mobx-react';

class Room1Page extends Component {

    componentDidMount = () => {
        appDataStore.setPageTitle("Room 1")
    }

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
                    <div style={{ height: "300px", display: "flex", flexWrap: "wrap" }}>
                        <LedStatus dataStore={dataStore} showLedRoom1 />
                        <SensorValue value={meanTemp1.toFixed(1)} title={"Mean Temp"} unit="°C"/>
                        <SensorValue value={Number(dataStore.humidity).toFixed(1)} title={"Humidity"} unit="%"/>
                    </div>
                </div>
                <EventTable dataStore={dataStore.eventsRoom1} />
            </div>
        );
    }
}

export default observer(Room1Page);
