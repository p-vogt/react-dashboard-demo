import React, { Component } from 'react';
import { TemperatureLineChart } from '../components'
class OverviewPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TemperatureLineChart />
            </div>
        );
    }
}

export default OverviewPage;
