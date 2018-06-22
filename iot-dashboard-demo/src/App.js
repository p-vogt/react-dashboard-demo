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
    this.addData = this.addData.bind(this);

    dataService.on('new-data', (event) => this.addData(event.name, event.temp1, event.temp2));

    dataService.on('error', (error) => {
      console.log(error);
    });

  }
  addData(name, temp1, temp2) {
    console.log(temp1, temp2)
    const newData = {
      timestamp: new Date().toISOString().substring(11, 19),
      name, temp1, temp2
    };
    dataStore.addData(newData);
  };

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
