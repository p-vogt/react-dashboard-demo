import React, { Component } from 'react';
import { EventTable } from '../components'
import { dataStore } from '../stores'

class Room1Page extends Component {

    render() {

        return (
            <div>
                <EventTable dataStore={dataStore} />
            </div>
        );
    }
}

export default Room1Page;
