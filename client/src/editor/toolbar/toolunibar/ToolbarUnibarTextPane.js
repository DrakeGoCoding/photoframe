import React from 'react'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core'

export default function ToolbarUnibarTextPane({ text, handleChangeText }) {
	const classes = useStyles()

	return (
		<div className={classes.toolTextPane}>
			<div className={classes.tabPager}>
				<div className={classes.tabPager_tabs}>
					<span className={classNames(classes.tabPagerItem_tab, classes.tabPagerItem_tab_active)}>Add text</span>
				</div>
				<div className={classes.tabPager_pager}>
					<div className={classNames(classes.tabPagerItem_page, classes.tabPagerItem_page_active)}>
						<div className={classes.tabPagerItem_container}>
							<section className={classes.toolTextPane_section}>
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
					</div>
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolTextPane: {

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
		lineHeight: 1.6,
		cursor: 'pointer'
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
