import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import openSocket from 'socket.io-client';

class Room1Page extends Component {
    constructor(props) {
        super(props);
        const dataService = openSocket('http://localhost:5000/user');

        dataService.on('new-data', (event) => {
            const data = this.state.data;
            console.log(event)
            if (!data) {
                return ("fehler")
            }
            data.unshift(this.createData(event.name, event.value));

            this.setState({
                data,
            })
        });
        this.state = {
            data: [],
            rowsPerPage: 5,
            page: 1
        }
    }
    id = 0;
    createData(name, value) {
        this.id += 1;
        return { id: this.id, name, value };
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        if (!data) {
            return ("fehler")
        }
        return (
            <div>
                <Table style={{ height: '100px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ereignis</TableCell>
                            <TableCell>Wert</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell component="th" scope="row">
                                        {n.name}
                                    </TableCell>
                                    <TableCell>{n.value}</TableCell>
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
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

export default Room1Page;
