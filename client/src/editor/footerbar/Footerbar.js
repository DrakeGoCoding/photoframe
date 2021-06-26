import React from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

export default function Footerbar({ cancelEdit }) {
	const classes = useStyles()

	return (
		<div className={classes.footerBar}>
			<div className={classes.footerBar_message}>
				<Typography className={classes.footerBar_header} variant="h2">Turn your photos into stunning graphics</Typography>
				<Typography className={classes.footerBar_subheader} variant="h3">From posters to cards and so much more - You can design anything in PhotoFrame</Typography>
			</div>
			<Tooltip title="Cancel" arrow>
				<Button className={classes.footerBar_cancelBtn} variant="contained" color="primary" onClick={cancelEdit}>Cancel</Button>
			</Tooltip>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	footerBar: {
		display: 'flex',
		alignItems: 'center',
		padding: '24px',
		background: '#0e1318'
	},
	footerBar_message: {
		flex: '1 1 auto',
		textAlign: 'left',
		marginRight: '8px'
	},
	footerBar_header: {
		margin: '0 0 8px',
		fontSize: '18px',
		color: 'white',
		fontWeight: 700,
		letterSpacing: '-0.1px',
		lineHeight: 1.3
	},
	footerBar_subheader: {
		margin: 0,
		fontSize: '14px',
		color: 'rgba(255, 255, 255, 0.65)',
		fontWeight: 400,
		lineHeight: '1.6',
		letterSpacing: 0
	},
	footerBar_cancelBtn: {
		flex: '0 1 auto',
		margin: 0,
		fontSize: '14px',
		fontWeight: '600',
		padding: '11px 16px'
	},
}))
