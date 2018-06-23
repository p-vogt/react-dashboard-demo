import React, { Component } from 'react';
import { TemperatureLineChart, LedStatus } from '../components'
import { dataStore } from '../stores'
class OverviewPage extends Component {

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TemperatureLineChart dataStore={dataStore} title={"Temperature"} />
                <LedStatus dataStore={dataStore} />
            </div>
        );
    }
}

export default OverviewPage;
