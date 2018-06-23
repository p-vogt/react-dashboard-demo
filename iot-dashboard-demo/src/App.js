import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { OverviewPage, Room1Page, Room2Page } from './pages';
import { Sidebar } from './components';
import { dataStore } from './stores'
import openSocket from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const dataService = openSocket('http://localhost:5000/user');

    dataService.on('temp1-data', (event) => dataStore.handleEvent('temp1-data', event));
    dataService.on('temp2-data', (event) => dataStore.handleEvent('temp2-data', event));
    dataService.on('led1-changed', (event) => dataStore.handleEvent('led1-changed', event));
    dataService.on('led2-changed', (event) => dataStore.handleEvent('led2-changed', event));

    dataService.on('error', (error) => {
      console.log(error);
    });

  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter style={{ gridColumnStart: "sidebar-end", gridRowStart: "appbar-end", gridRowEnd: "bottom" }}>
          <React.Fragment>
            <AppBar position="static" color="default" style={{ gridColumnStart: "sidebar-start", gridColumnEnd: "right" }}>
              <Toolbar>
                <Typography variant="title" color="inherit" style={{ marginTop: "-10px" }}>
                  Smart Home Dashboard
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

export default App;
