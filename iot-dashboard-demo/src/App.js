import React, { Component } from 'react';
import { HOME_PATH, MICROSERVICE_URL } from './constants'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { OverviewPage, Room1Page, Room2Page } from './pages';
import { Sidebar, NotificationBar } from './components';
import { dataStore, appDataStore } from './stores'
import { observer } from 'mobx-react'
import openSocket from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const temp1Service = openSocket(MICROSERVICE_URL + '/temp1');
    const temp2Service = openSocket(MICROSERVICE_URL + '/temp2');
    const humidityService = openSocket(MICROSERVICE_URL + '/humidity');
    const brightnessService = openSocket(MICROSERVICE_URL + '/brightness');
    const led1Service = openSocket(MICROSERVICE_URL + '/led1');
    const led2Service = openSocket(MICROSERVICE_URL + '/led2');
    const alarmService = openSocket(MICROSERVICE_URL + '/alarm');

    temp1Service.on('temp1-data', (event) => dataStore.handleEvent('temp1-data', event));
    temp1Service.on('error', (error) => console.error("temp1Service", error));

    temp2Service.on('temp2-data', (event) => dataStore.handleEvent('temp2-data', event));
    temp2Service.on('error', (error) => console.error("temp2Service", error));

    humidityService.on('humidity-data', (event) => dataStore.handleEvent('humidity-data', event));
    humidityService.on('error', (error) => console.error("humidityService", error));

    brightnessService.on('brightness-data', (event) => dataStore.handleEvent('brightness-data', event));
    brightnessService.on('error', (error) => console.error("brightnessService", error));

    led1Service.on('led1-changed', (event) => this.onNewEvent('led1-changed', event));
    led1Service.on('error', (error) => console.error("led1Service", error));
    
    led2Service.on('led2-changed', (event) => this.onNewEvent('led2-changed', event));
    led2Service.on('error', (error) => console.error("led2Service", error));
    
    alarmService.on('alarm', (event) => this.onNewEvent('alarm', event));
    alarmService.on('error', (error) => console.error("alarmService", error));
 

    this.state = {
      showNotificationBar: false,
      notificationText: ""
    };

    this.onNewEvent = this.onNewEvent.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onNewEvent(name, event) {
    if (!event) {
      console.error("onNewEvent: received null as event!" , event);
      return;
    }
    dataStore.handleEvent(name, event)
    this.setState({
      showNotificationBar: true,
      notificationText: event.description
    })
  }
  handleClose() {
    this.setState({ showNotificationBar: false })
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter style={{ gridColumnStart: "sidebar-end", gridRowStart: "appbar-end", gridRowEnd: "bottom" }}>
          <React.Fragment>
            <NotificationBar open={this.state.showNotificationBar} text={this.state.notificationText} handleClose={this.handleClose} />
            <AppBar position="static" color="default" style={{ gridColumnStart: "sidebar-start", gridColumnEnd: "right" }}>
              <Toolbar>
                <Typography variant="title" color="inherit" style={{ marginTop: "-10px" }}>
                  {appDataStore.pageTitle}
                </Typography>
              </Toolbar>
            </AppBar>
            <Sidebar />
            <Switch exact>
              <Route exact path={HOME_PATH + "/"} component={OverviewPage} />
              <Route exact path={HOME_PATH + "/Room1"} component={Room1Page} />
              <Route exact path={HOME_PATH + "/Room2"} component={Room2Page} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default observer(App);
