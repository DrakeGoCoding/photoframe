import React from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core'
import { Slider } from '@material-ui/core'

export default function ToolbarUnibarFilterPane({ filters, handleChangeFilter, resetFilters }) {
	const classes = useStyles()

	return (
		<div className={classes.toolFilterPane}>
			<div className={classes.tabPager}>
				<div className={classes.tabPager_tabs}>
					<span className={classNames(classes.tabPagerItem_tab, classes.tabPagerItem_tab_active)}>Adjust</span>
				</div>
				<div className={classes.tabPager_pager}>
					<div className={classNames(classes.tabPagerItem_page, classes.tabPagerItem_page_active)}>
						<div className={classes.tabPagerItem_container}>
							<div className={classes.toolFilterPane_sliderGrid}>
								{
									filters.map((option, index) => {
										return (
											<div key={index}>
												<div className={classes.toolFilterPane_sliderLabel}>{option.name}</div>
												<div className={classes.toolFilterPane_sliderControl}>
													<Slider
														min={option.range.min}
														max={option.range.max}
														step={option.range.step}
														value={option.value}
														onChange={(e, val) => handleChangeFilter(e, val, option.name)} />
												</div>
											</div>
										)
									})
								}
							</div>
							<button
								className={classes.toolFilterPane_resetBtn}
								onClick={resetFilters}
								style={{ float: 'right' }}>Reset</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolFilterPane: {

	},
	tabPager: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw'
	},
	tabPager_tabs: {
		flex: '0 0 auto',
		display: 'flex',
		justifyContent: 'center',
		// marginTop: '16px'
	},
	tabPagerItem_tab: {
		flex: '0 1 auto',
		display: 'block',
		margin: 0,
		padding: '0 16px',
		color: 'rgba(255, 255, 255, 0.65)',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6
	},
	tabPagerItem_tab_active: {
		color: 'white'
	},
	tabPager_pager: {
		position: 'relative',
		display: 'flex'
	},
	tabPagerItem_page: {
		flex: '0 0 auto',
		position: 'relative',
		marginLeft: '-100%',
		left: '100%',
		width: '100%',
		overflowX: 'auto',
		opacity: 0,
		transform: 'scale(0.998)',
		zIndex: -1,
	},
	tabPagerItem_page_active: {
		opacity: 1,
		transform: 'none',
		zIndex: 'auto',
		transition: 'opacity 0.3s ease, transform 0.3s ease'
	},
	tabPagerItem_container: {
		display: 'inline-block',
		padding: '24px',
		minWidth: '100%',
		height: '100%'
	},
	toolFilterPane_sliderGrid: {
		display: 'grid',
		'--gridLines': 2,
		gridTemplateColumns: 'repeat(var(--gridLines, 1), 1fr)',
		gridAutoRows: 'auto',
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
			color: theme.palette.primary.main
		}
	},
}))
