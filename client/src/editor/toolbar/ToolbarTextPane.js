import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'

export default function ToolbarTextPane({ text, handleChangeText }) {
	const classes = useStyles()

	return (
		<div className={classes.toolTextPane}>
			<section className={classes.toolTextPane_section}>
				<Typography className={classes.toolTextPane_sectionHeading} variant="h3">Add text</Typography>
				<div className={classes.toolTextPane_sliderGrid}>
					<form className={classes.toolTextPane_textForm}>
						<div className={classes.toolTextPane_form}>
							<textarea className={classes.textForm_textarea} value={text} onChange={e => handleChangeText(e.target.value)} />
						</div>
					</form>
				</div>
			</section>
			<section className={classes.toolTextPane_section}>
				<button className={classes.toolTextPane_resetBtn} onClick={(e) => handleChangeText('')} style={{ float: 'right' }}>Reset</button>
			</section>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolTextPane: {

	},
	toolTextPane_section: {
		marginBottom: '32px',
	},
	toolTextPane_sectionHeading: {
		marginTop: 0,
		color: 'white',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
		marginBottom: '16px'
	},
	toolEditPane_textForm: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	toolEditPane_form: {
		display: 'flex',
	},
	textForm_textarea: {
		fontFamily: 'inherit',
		resize: 'none',
		margin: 0,
		padding: '12px',
		border: 'none',
		borderRadius: '4px',
		color: 'white',
		background: '#1a212a',
		boxShadow: '0 0 0 0 rgb(0 196 204 / 0%)',
		transition: 'box-shadow 0.2s ease-out',
		width: '100%',
		height: '100px',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
	},
	toolTextPane_resetBtn: {
		color: 'rgba(255, 255, 255, 0.65)',
		margin: 0,
		padding: 0,
		border: 'none',
		background: 'none',
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: 1.6,
		letterSpacing: 0,
		cursor: 'pointer',
		transition: 'color 0.3s',
		'&:hover': {
			color: theme.palette.primary.main
		}
	},
}))