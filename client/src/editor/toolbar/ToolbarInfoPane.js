import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { convertStringToDate } from '../../utils/utils'

export default function ToolbarInfoPane({ data }) {
	const classes = useStyles()

	const rows = [
		{
			name: 'ID',
			value: data.id
		},
		{
			name: 'Owner',
			value: data.owner
		},
		{
			name: 'Format',
			value: data.format
		},
		{
			name: 'Dimensions',
			value: `${data.width} x ${data.height}`
		},
		{
			name: 'Uploaded',
			value: convertStringToDate(data.uploadedAt)
		}
	]

	return (
		<div className={classes.toolInfoPane}>
			<Typography className={classes.toolInfoPane_heading} variant="h3">Summary</Typography>
			<TableContainer>
				<Table className={classes.toolInfoTable}>
					<TableBody>
						{rows.map(row => (
							<TableRow className={classes.toolInfoPane_row} key={row.name}>
								<TableCell className={classes.toolInfoPane_header} component="th" scope="row">{row.name}</TableCell>
								<TableCell className={classes.toolInfoPane_data} align="right">{row.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolInfoPane: {

	},
	toolInfoPane_heading: {
		marginTop: 0,
		color: 'white',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
		marginBottom: '16px'
	},
	toolInfoTable: {

	},
	toolInfoPane_row: {

	},
	toolInfoPane_header: {
		marginTop: 0,
		color: 'rgba(255, 255, 255, 0.65)',
		fontSize: '14px',
		fontWeight: 400,
		border: 'none',
		paddingLeft: 0
	},
	toolInfoPane_data: {
		marginTop: 0,
		color: theme.palette.primary.main,
		fontSize: '14px',
		fontWeight: 400,
		border: 'none',
		paddingRight: 0,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}
}))