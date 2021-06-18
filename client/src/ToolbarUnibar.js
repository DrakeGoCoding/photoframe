import React from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core'
import ToolbarUnibarFilterPane from './ToolbarUnibarFilterPane'
import ToolbarUnibarEditPane from './ToolbarUnibarEditPane'
import ToolbarUnibarTextPane from './ToolbarUnibarTextPane'

export default function ToolbarUnibar({ filters, services, handleShowPane, handleChangeFilter, resetFilters, visibleBackBtn, setVisibleBackBtn }) {
	const classes = useStyles()

	const SERVICES_DICTIONARY = [
		{
			name: 'Filter',
			pane:
				<ToolbarUnibarFilterPane
					filters={filters}
					handleChangeFilter={handleChangeFilter}
					resetFilters={resetFilters} />
		},
		{
			name: 'Edit',
			pane:
				<ToolbarUnibarEditPane />
		},
		{
			name: 'Text',
			pane:
				<ToolbarUnibarTextPane />
		}
	]

	return (
		<div className={classes.toolbarUnibar}>
			<div className={
				visibleBackBtn
					? classes.toolbarUnibar_childWrapper
					: classNames(classes.toolbarUnibar_childWrapper, classes.toolbarUnibar_childWrapper_active)}>
				<div className={classes.toolbarUnibar_mainMenuGrid}>
					<div className={classNames(classes.grid, classes.gridHorizontal)}>
						{
							services.map((option, index) => {
								return (
									<div key={index} className={classes.gridItem}>
										<div className={classes.gridItem_content}>
											<div className={classes.gridItem_container}>
												<button
													className={classes.toolbarUnibar_mainMenuItem}
													onClick={() => { handleShowPane(index); setVisibleBackBtn(true) }}>
													{option.icon}
												</button>
											</div>
										</div>
										<div className={classes.gridItem_label}>{option.name}</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
			{
				services.map((option, index) => {
					return (
						<div
							key={index}
							className={
								option.active
									? classNames(classes.toolbarUnibar_childWrapper, classes.toolbarUnibar_childWrapper_active)
									: classes.toolbarUnibar_childWrapper}>
							{SERVICES_DICTIONARY.find(item => item.name === option.name).pane}
						</div>
					)
				})
			}
		</div >
	)
}

const useStyles = makeStyles(theme => ({
	toolbarUnibar: {
		display: 'flex',
		position: 'relative'
	},
	toolbarUnibar_childWrapper: {
		display: 'flex',
		alignItems: 'flex-end',
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
	toolbarUnibar_childWrapper_active: {
		opacity: 1,
		zIndex: 'auto',
		transform: 'none',
		transition: 'opacity 0.3s ease, transform 0.3s ease'
	},
	toolbarUnibar_mainMenuGrid: {
		display: 'inline-block',
		padding: '24px'
	},
	toolbarUnibar_mainMenuItem: {
		margin: 0,
		padding: 0,
		width: '96px',
		height: '96px',
		border: 'none',
		background: 'none',
		color: 'white',
		filter: 'brightness(0) invert(1)',
		cursor: 'pointer',
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
		marginTop: '16px'
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
	tabPager_page_active: {
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

	/*----------- Utils ----------- */
	grid: {
		display: 'inline-grid',
		gridGap: '16px',
		gridTemplateColumns: 'repeat(var(--gridLines, 1), 1fr)',
		gridTemplateRows: 'unset',
		gridAutoFlow: 'row'
	},
	gridHorizontal: {
		gridTemplateRows: 'repeat(var(--gridLines, 1), 1fr)',
		gridTemplateColumns: 'unset',
		gridAutoFlow: 'column'
	},
	gridItem: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		'--gridLines': 'unset'
	},
	gridItem_content: {
		position: 'relative',
		cursor: 'pointer',
		margin: 0,
		padding: 0,
		border: 'none',
		borderRadius: '4px',
		background: '#1A212A',
		color: 'white',
		flex: '1 1 auto',
		display: 'flex',
		justifyContent: 'stretch',
		alignItems: 'stretch',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
		'&::after': {
			content: '',
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			borderRadius: '4px',
			boxShadow: '0 0 0 0 rgb(0 196 204 / 0%), inset 0 0 0 0 rgb(14 19 24 / 0%)',
			// pointerEvents: 'none',
			transition: 'background 0.2s ease-out, box-shadow 0.2s ease-out'
		}
	},
	gridItem_container: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'stretch',
		alignItems: 'stretch',
		width: '100%',
		borderRadius: '4px',
		overflow: 'hidden'
	},
	gridItem_label: {
		flex: '0 1 auto',
		margin: '8px 0 0',
		height: '16px',
		color: 'rgba(255, 255, 255, 0.65)',
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: 1.6,
		letterSpacing: 0
	},

	'@media (min-width: 1177px)': {
		toolbarUnibar: {
			display: 'none'
		},
	},
}))
