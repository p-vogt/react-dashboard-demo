import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';


class Sidebar extends Component {
    render() {
        return (
            <List component="nav" style={{ gridColumnStart: "sidebar-start", background: "rgba(46, 46, 46, 0.836)" }}>
                <ListItem button onClick={() => this.props.history.push("/")}>
                    <Typography style={{ color: "white" }}>
                        Overview
            </Typography>
                </ListItem>
                <Divider />
                <ListItem button divider onClick={() => this.props.history.push("/Room1")}>
                    <Typography style={{ color: "white" }}>
                        Room 1
            </Typography>
                </ListItem>
                <ListItem button onClick={() => this.props.history.push("/Room2")}>
                    <Typography style={{ color: "white" }}>
                        Room 2
            </Typography>
                </ListItem>
            </List>

        );
    }
}

export default withRouter(Sidebar);
