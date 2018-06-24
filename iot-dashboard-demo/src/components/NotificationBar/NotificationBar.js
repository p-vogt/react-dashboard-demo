import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const NotificationBar = (props) => (

    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.text}</span>}
        action={[
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={props.handleClose}
            >
                <CloseIcon />
            </IconButton>,
        ]}
    />
)

export default NotificationBar