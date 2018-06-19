import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { OverviewPage, Room1Page, Room2Page } from './pages';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default" style={{ gridColumnStart: "sidebar-start", gridColumnEnd: "right" }}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Title
          </Typography>
          </Toolbar>
        </AppBar>
        <List component="nav" style={{ gridColumnStart: "sidebar-start", background: "rgba(46, 46, 46, 0.836)" }}>
          <ListItem button>
            <Typography style={{ color: "white" }}>
              Overview
            </Typography>
          </ListItem>
          <Divider />
          <ListItem button divider>
            <Typography style={{ color: "white" }}>
              Room 1
            </Typography>
          </ListItem>
          <ListItem button>
            <Typography style={{ color: "white" }}>
              Room 2
            </Typography>
          </ListItem>
        </List>
        <BrowserRouter style={{ gridColumnStart: "sidebar-end", gridRowStart: "appbar-end", gridRowEnd: "bottom" }}>
          <Switch exact>
            <Route exact path={"/"} component={OverviewPage} />
            <Route exact path={"/Room1"} component={Room1Page} />
            <Route exact path={"/Room2"} component={Room2Page} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
