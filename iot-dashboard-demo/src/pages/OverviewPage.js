import React, { Component } from 'react';
import { TemperatureLineChart, LedStatus } from '../components'
import { dataStore, appDataStore } from '../stores'
import { Line, ReferenceLine } from 'recharts';
import { observer } from 'mobx-react';

class OverviewPage extends Component {

    componentDidMount = () => {
        appDataStore.setPageTitle("Overview")
    }

    render() {

        const meanTemp1 = dataStore.meanLastTemperature1;
        const meanTemp2 = dataStore.meanLastTemperature2;
        return (
            <div style={{ display: 'flex' }}>
                <TemperatureLineChart data={dataStore.lastTemperatureData} title={"Temperature"} >
                    <ReferenceLine y={meanTemp1} label="" stroke="#8884ee" strokeDasharray="5 5" />
                    <ReferenceLine y={meanTemp2} label="" stroke="#0084ee" strokeDasharray="5 5" />
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="value" name="Room 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dot={false} animationDuration={0} dataKey="value2" name="Room 2" stroke="#0084d8" activeDot={{ r: 8 }} />
                </TemperatureLineChart>
                <LedStatus dataStore={dataStore} showLedRoom1 showLedRoom2 />
                <div style={{align: "left"}}>
                    <p>Mean Room 1 Temp: {meanTemp1.toFixed(2)} °C </p>
                    <p>Mean Room 2 Temp: {meanTemp2.toFixed(2)} °C </p>
                </div>
            </div>

        );
    }
}

export default observer(OverviewPage);
