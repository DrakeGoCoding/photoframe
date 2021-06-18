import React from 'react'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import ToolbarFilterPane from './ToolbarFilterPane';
import ToolbarEditPane from './ToolbarEditPane';
import ToolbarTextPane from './ToolbarTextPane';
import ToolbarUnibar from './ToolbarUnibar';

export default function Toolbar({ services, filters, handleShowPane, handleChangeFilter, resetFilters, visibleBackBtn, setVisibleBackBtn }) {
	const classes = useStyles()

	const SERVICES_DICTIONARY = [
		{
			name: 'Filter',
			pane:
				<ToolbarFilterPane
					filters={filters}
					handleChangeFilter={handleChangeFilter}
					resetFilters={resetFilters} />
		},
		{
			name: 'Edit',
			pane:
				<ToolbarEditPane />
		},
		{
			name: 'Text',
			pane:
				<ToolbarTextPane />
		}
	]

	return (
		<div className={classes.toolbar}>
			<div className={classes.toolbarTabs}>
				{
					services.map((option, index) => {
						return (
							<React.Fragment key={index}>
								<Tooltip title={option.name} arrow>
									<button
										className={
											services[index].active
												? classNames(classes.toolbarTabs_tab, classes.toolbarTabs_tab_active)
												: classes.toolbarTabs_tab}
										onClick={() => { handleShowPane(index); setVisibleBackBtn(true) }}>
										{option.icon}
									</button>
								</Tooltip>
							</React.Fragment>
						)
					})
				}
			</div>
			<div className={classes.toolbarPane}>
				{
					services.map((option, index) => {
						return (
							<div
								key={index}
								className={
									option.active
										? classNames(classes.toolbarPane_childWrapper, classes.toolbarPane_childWrapper_active)
										: classes.toolbarPane_childWrapper}>
								<div className={classes.toolbarPane_childContent}>
									{SERVICES_DICTIONARY.find(item => item.name === option.name).pane}
								</div>
							</div>
						)
					})
				}
			</div>
			<ToolbarUnibar
				filters={filters}
				services={services}
				handleShowPane={handleShowPane}
				handleChangeFilter={handleChangeFilter}
				resetFilters={resetFilters}
				visibleBackBtn={visibleBackBtn}
				setVisibleBackBtn={setVisibleBackBtn} />
		</div>
	)
}

const useStyles = makeStyles(theme => ({

	/*----------- TOOL BAR ----------- */
	toolbarSection: {
		flex: '0 0 auto',
		zIndex: 2
	},
	toolbar: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%'
	},
	toolbarTabs: {
		position: 'relative',
		width: '72px',
		height: '100%',
		background: '#1a212a'
	},
	toolbarTabs_tab: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		margin: 0,
		padding: 0,
		width: '100%',
		height: '72px',
		zIndex: 2,
		cursor: 'pointer',
		border: 'none',
		background: 'none',
		filter: 'contrast(0) brightness(200%)',
	},
	toolbarTabs_tab_active: {
		filter: 'none',
		cursor: 'unset',
		color: '#039be5',
		backgroundColor: '#232c38',
		transition: 'background 0.3s ease-out',
	},
	toolbarPane: {
		position: 'relative',
		width: '320px',
		height: '100%',
		background: '#232C38'
	},
	toolbarPane_childWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		overflowY: 'auto',
		opacity: 0,
		transform: 'scale(0.998)',
		zIndex: -1,
	},
	toolbarPane_childWrapper_active: {
		opacity: 1,
		transform: 'none',
		zIndex: 'auto',
		transition: 'opacity 0.3s ease, transform 0.3s ease'
	},
	toolbarPane_childContent: {
		padding: '24px',
	},

	'@media (min-width: 1177px)': {

	},

	'@media (max-width: 1176px)': {
		toolbar: {
			flexDirection: 'column'
		},
		toolbarTabs: {
			display: 'none'
		},
		toolbarPane: {
			display: 'none'
		},
	},
}))
