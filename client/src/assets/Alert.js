import React from 'react'
import { Typography } from '@material-ui/core'

export default function Alert(props) {
    const message = props.message;
    return (
        <Typography variant="caption" color="error">
            <br />{message}
        </Typography>
    )
}
