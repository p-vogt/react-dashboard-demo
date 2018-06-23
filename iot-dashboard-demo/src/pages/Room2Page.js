import React, { Component } from 'react';
import { EventTable } from '../components'
import { dataStore } from '../stores'
class Room2Page extends Component {

    render() {
        return (
            <div>
               <EventTable dataStore={dataStore.eventDataRoom2} />
            </div>
        );
    }
}

export default Room2Page;
