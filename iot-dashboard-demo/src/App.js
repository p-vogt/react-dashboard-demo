import React, { Component } from 'react';
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
    const dataService = openSocket('http://localhost:5000/user');

    dataService.on('temp1-data', (event) => dataStore.handleEvent('temp1-data', event));
    dataService.on('temp2-data', (event) => dataStore.handleEvent('temp2-data', event));
    dataService.on('led1-changed', (event) => this.onNewEvent('led1-changed', event));
    dataService.on('led2-changed', (event) => dataStore.handleEvent('led2-changed', event));

    dataService.on('error', (error) => {
      console.log(error);
    });
    this.state = {
      showNotificationBar: false,
      notificationText: ""
    };
    this.onNewEvent = this.onNewEvent.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onNewEvent(name, event) {
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
              <Route exact path={"/"} component={OverviewPage} />
              <Route exact path={"/Room1"} component={Room1Page} />
              <Route exact path={"/Room2"} component={Room2Page} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default observer(App);
