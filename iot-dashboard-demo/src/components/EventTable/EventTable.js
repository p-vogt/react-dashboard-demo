import React, { Component } from 'react';

import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

class EventTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowsPerPage: 5,
            page: 0
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { rowsPerPage, page } = this.state;
        const events = this.props.dataStore.slice().reverse();
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, events.length - page * rowsPerPage);

        if (!events) {
            return ("Fehler")
        }
        return (
            <Table style={{ height: '100px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(event => {
                        return (
                            <TableRow key={event.id}>
                                <TableCell>{new Date(Date.parse(event.timestamp)).toLocaleTimeString()}</TableCell>
                                <TableCell component="th" scope="row">
                                    {event.description}
                                </TableCell>
                                <TableCell>{event.stringValue}</TableCell>
                            </TableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={2} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={2}
                            count={events.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

export default observer(EventTable);
