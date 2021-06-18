import React from 'react'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core'
import { Button, Tooltip, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Headerbar({ handleShowPane, handleSave, handleDownload, backBtnRef, visibleBackBtn, setVisibleBackBtn }) {
	const classes = useStyles()

	const disableBackBtn = () => {
		setVisibleBackBtn(false)
		handleShowPane(-1)
	}

	return (
		<div className={classes.headerBar}>
			<Button
				className={
					visibleBackBtn
						? classNames(classes.headerBar_backBtn, classes.headerBar_backBtn_enabled)
						: classes.headerBar_backBtn}
				variant="contained" color="primary"
				onClick={disableBackBtn}
				ref={backBtnRef}>
				<ArrowBackIosIcon className={classes.headerBar_backIcon} />
			</Button>

			{visibleBackBtn ? <Typography className={classes.headerBar_title} variant="h2">Back</Typography> : ''}

			<div className={classes.headerBar_rightBtns}>
				<Tooltip title="Save" arrow>
					<Button
						className={classes.headerBar_saveBtn}
						variant="contained" color="primary"
						onClick={handleSave}>
						<SaveIcon className={classes.headerBar_saveIcon} />
						<span className={classes.headerBar_saveLabel}>Save</span>
					</Button>
				</Tooltip>

				<Tooltip title="Download" arrow>
					<Button
						className={classes.headerBar_downloadBtn}
						variant="contained" color="primary"
						onClick={handleDownload}>
						<SaveAltIcon className={classes.headerBar_downloadIcon} />
						<span className={classes.headerBar_saveLabel}>Download</span>
					</Button>
				</Tooltip>
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	headerBar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '24px 24px 0'
	},
	headerBar_backBtn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '24px',
		minWidth: 'unset',
		fontSize: '14px',
		fontWeight: 600,
		background: 'none',
		boxShadow: 'none',
		visibility: 'collapse',
		transition: 'color 0.3s ease-out',
		'&:hover': {
			background: 'none',
			boxShadow: 'none',
			color: '#039be5'
		}
	},
	headerBar_backBtn_enabled: {
		visibility: 'visible'
	},
	headerBar_backIcon: {

	},
	headerBar_title: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '24px 0',
		color: 'white',
		fontSize: '16px',
	},
	headerBar_rightBtns: {
		display: 'flex',
		flexDirection: 'row',
		margin: '0 0 0 auto',
	},
	headerBar_saveBtn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: '96px',
		padding: '11px 16px',
		fontSize: '14px',
		fontWeight: 600,
		textDecoration: 'none',
		transition: 'all 0.3s ease-out'
	},
	headerBar_saveIcon: {
		display: 'none',
	},
	headerBar_saveLabel: {
		display: 'none',
	},
	headerBar_downloadBtn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: '16px',
		minWidth: '96px',
		padding: '11px 16px',
		fontSize: '14px',
		fontWeight: 600,
		textDecoration: 'none',
		transition: 'all 0.3s ease-out'
	},
	headerBar_downloadIcon: {
		display: 'none',
	},
	headerBar_downloadLabel: {
		display: 'none',
	},

	'@media (min-width: 1177px)': {
		headerBar_backBtn: {
			display: 'none'
		},
		headerBar_title: {
			display: 'none',
		},
		headerBar_saveLabel: {
			display: 'inline'
		},
		headerBar_downloadLabel: {
			display: 'inline'
		}
	},

	'@media (max-width: 1176px)': {
		headerBar: {
			padding: 0,
			height: '72px'
		},
		headerBar_saveBtn: {
			padding: '16px',
			margin: '0 0 0 16px',
			minWidth: 'unset',
			border: 'none',
			background: 'none',
			boxShadow: 'none',
			'&:hover': {
				background: 'none',
				boxShadow: 'none',
				color: '#039be5'
			}
		},
		headerBar_downloadBtn: {
			padding: '16px',
			margin: '0 16px 0 0',
			minWidth: 'unset',
			border: 'none',
			background: 'none',
			boxShadow: 'none',
			'&:hover': {
				background: 'none',
				boxShadow: 'none',
				color: '#039be5'
			}
		},
		headerBar_saveIcon: {
			display: 'inline'
		},
		headerBar_downloadIcon: {
			display: 'inline'
		},

	},
}))