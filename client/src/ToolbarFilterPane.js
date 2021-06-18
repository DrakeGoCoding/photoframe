import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Slider, Typography } from '@material-ui/core'

export default function ToolBarFilterPane({ filters, handleChangeFilter, resetFilters }) {
	const classes = useStyles()

	return (
		<div className={classes.toolFilterPane}>
			<section className={classes.toolFilterPane_section}>
				<Typography className={classes.toolFilterPane_sectionHeading} variant="h3">Adjust</Typography>
				<div className={classes.toolFilterPane_sliderGrid}>
					{
						filters.map((option, index) => {
							return (
								<React.Fragment key={index}>
									<div className={classes.toolFilterPane_sliderLabel}>{option.name}</div>
									<div className={classes.toolFilterPane_sliderControl}>
										<Slider min={option.range.min} max={option.range.max} step={option.range.step} value={option.value} onChange={(e, val) => handleChangeFilter(e, val, option.name)} />
									</div>
								</React.Fragment>
							)
						})
					}
				</div>
			</section>
			<section className={classes.toolFilterPane_section}>
				<button className={classes.toolFilterPane_resetBtn} onClick={resetFilters} style={{ float: 'right' }}>Reset</button>
			</section>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolFilterPane: {

	},
	toolFilterPane_section: {
		marginBottom: '32px',
	},
	toolFilterPane_sectionHeading: {
		marginTop: 0,
		color: 'white',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
		marginBottom: '16px'
	},
	toolFilterPane_sliderGrid: {
		display: 'grid',
		gridTemplate: 'auto / min-content auto',
		gridAutoRows: 'auto',
		gridRowGap: '16px',
		gridColumnGap: '24px',
		alignItems: 'center',
		width: '100%'
	},
	toolFilterPane_sliderLabel: {
		margin: 0,
		color: 'rgba(255, 255, 255, 0.65)'
	},
	toolFilterPane_sliderControl: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	toolFilterPane_resetBtn: {
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
			color: '#039be5'
		}
	},
}))
