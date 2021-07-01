import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import FlipIcon from '@material-ui/icons/Flip';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import theme from '../../theme'

export default function ToolbarEditPane({ edits, handleChangeEdit, resetEdits, setActiveEdit }) {
	const classes = useStyles()

	const [expanded, setExpanded] = useState(false)
	const [rotateDegree, setRotateDegree] = useState(0)
	const [flipX, setFlipX] = useState(1)
	const [flipY, setFlipY] = useState(1)
	const [zoomX, setZoomX] = useState(1.0)
	const [zoomY, setZoomY] = useState(1.0)
	const [lockZoom, setLockZoom] = useState(false)

	const rotateLeft = (e) => {
		const newDegree = (rotateDegree - 90) % 360
		handleChangeEdit(e, newDegree, 'Rotate')
		setRotateDegree(newDegree)
	}

	const rotateRight = (e) => {
		const newDegree = (rotateDegree + 90) % 360
		handleChangeEdit(e, newDegree, 'Rotate')
		setRotateDegree(newDegree)
	}

	const flipVertical = (e) => {
		const newFlipX = (flipX === 1) ? -1 : 1
		handleChangeEdit(e, { x: newFlipX, y: flipY }, 'Flip')
		setFlipX(newFlipX)
	}

	const flipHorizontal = (e) => {
		const newFlipY = (flipY === 1) ? -1 : 1
		handleChangeEdit(e, { x: flipX, y: newFlipY }, 'Flip')
		setFlipY(newFlipY)
	}

	const zoomVertical = (e) => {
		let value = e.target.value;
		if (value === '') value = 0;
		const newZoomX = value
		handleChangeEdit(e, { x: newZoomX, y: zoomY }, 'Resize')
		setZoomX(newZoomX)
	}

	const zoomHorizontal = (e) => {
		let value = e.target.value;
		if (value === '') value = 0;
		const newZoomY = value
		handleChangeEdit(e, { x: zoomX, y: newZoomY }, 'Resize')
		setZoomY(newZoomY)
	}

	const zoomBoth = (e) => {
		let value = e.target.value;
		if (value === '' || value === 0) value = 0;
		handleChangeEdit(e, { x: value, y: value }, 'Resize');
		setZoomX(value);
		setZoomY(value)
	}

	const toggleLockZoom = () => {
		setLockZoom(lockZoom ? false : true)
		setZoomX(Math.max(zoomX, zoomY))
		setZoomY(Math.max(zoomX, zoomY))
	}

	const resetAll = () => {
		resetEdits();
		setRotateDegree(0);
		setFlipX(1);
		setFlipY(1);
		setZoomX(1);
		setZoomY(1);
	}

	const EDIT_PANE_DICTIONARY = [
		{
			name: 'Rotate',
			pane:
				<section className={classes.toolEditPane_rotateSection}>
					<button className={classes.toolEditPane_button} onClick={rotateLeft}>
						<RotateLeftIcon className={classes.toolEditPane_rotateLeftIcon} />
						<span className={classes.toolEditPane_buttonLabel}>Left</span>
					</button>
					<button className={classes.toolEditPane_button} onClick={rotateRight}>
						<RotateRightIcon className={classes.toolEditPane_rotateRightIcon} />
						<span className={classes.toolEditPane_buttonLabel}>Right</span>
					</button>
				</section>
		},
		{
			name: 'Flip',
			pane:
				<section className={classes.toolEditPane_flipSection}>
					<button className={classes.toolEditPane_button} onClick={flipVertical}>
						<FlipIcon className={classes.toolEditPane_flipVerticalIcon} />
						<span className={classes.toolEditPane_buttonLabel}>Vertical</span>
					</button>
					<button className={classes.toolEditPane_button} onClick={flipHorizontal}>
						<FlipIcon className={classes.toolEditPane_flipHorizontalIcon} />
						<span className={classes.toolEditPane_buttonLabel}>Horizontal</span>
					</button>
				</section>
		},
		{
			name: 'Crop',
			pane: ''
		},
		{
			name: 'Resize',
			pane:
				<section className={classes.toolEditPane_resizeSection}>
					<form className={classes.toolEditPane_resizeForm}>
						<div className={classes.toolEditPane_sizeForm}>
							<div className={classes.sizeForm_field}>
								<label className={classes.sizeForm_label}>W</label>
								<label className={classes.sizeForm_labelX}>x</label>
								<input className={classes.sizeForm_input} type="number" min={0} step={0.1} value={zoomX} onChange={lockZoom ? zoomBoth : zoomVertical} />
							</div>
							<button className={classes.sizeForm_lockBtn} type="button" onClick={toggleLockZoom}>
								{lockZoom
									? <LockIcon className={classes.sizeForm_lockIcon} style={{ color: 'white', fontSize: '16px' }} />
									: <LockOpenIcon className={classes.sizeForm_lockIcon} style={{ color: 'white', fontSize: '16px', opacity: 0.4 }} />
								}
							</button>
							<div className={classes.sizeForm_field}>
								<label className={classes.sizeForm_label}>H</label>
								<label className={classes.sizeForm_labelX}>x</label>
								<input className={classes.sizeForm_input} type="number" min={0} step={0.1} value={zoomY} onChange={lockZoom ? zoomBoth : zoomHorizontal} />
							</div>
						</div>
					</form>
				</section>
		},
	]

	const handleChange = (panel) => (e, isExpanded) => {
		setActiveEdit(panel)
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<div className={classes.toolEditPane}>
			{
				edits.map((option, index) => {
					return (
						<Accordion
							key={index}
							className={classes.accordion}
							expanded={expanded === option.name}
							onChange={handleChange(option.name)}>
							<AccordionSummary
								className={classes.accordion_label}
								expandIcon={
									<ExpandMoreIcon style={{
										color: expanded === option.name ? theme.palette.primary.main : 'white'
									}} />}>
								{option.name}
							</AccordionSummary>
							<AccordionDetails>{EDIT_PANE_DICTIONARY[index].pane}</AccordionDetails>
						</Accordion>
					)
				})
			}
			<section className={classes.toolEditPane_section}>
				<button className={classes.toolEditPane_resetBtn} onClick={resetAll} style={{ float: 'right' }}>Reset</button>
			</section>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	toolEditPane: {

	},
	accordion: {
		background: 'none',
		boxShadow: 'none',
		borderBottom: 'solid 1px rgba(255, 255, 255, 0.15)'
	},
	accordion_label: {
		color: 'white',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: '1.6',
		padding: '16px 0'
	},
	toolEditPane_section: {
		marginTop: '32px',
		marginBottom: '32px',
	},
	toolEditPane_rotateSection: {
		display: 'grid',
		gridTemplate: 'auto / auto auto',
		gridGap: '16px'
	},
	toolEditPane_button: {
		margin: 0,
		padding: '12px',
		border: '2px solid transparent',
		borderRadius: '4px',
		color: 'white',
		background: '#1A212A',
		position: 'relative',
		display: 'flex',
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '400',
		letterSpacing: 0,
		lineHeight: '1.6',
		transition: 'border 0.3s',
		'&:hover': {
			borderColor: theme.palette.primary.main
		}
	},
	toolEditPane_flipSection: {
		display: 'grid',
		gridTemplate: 'auto / auto auto',
		gridGap: '16px'
	},
	toolEditPane_flipVerticalIcon: {

	},
	toolEditPane_flipHorizontalIcon: {
		transform: 'rotate(90deg)'
	},
	toolEditPane_buttonLabel: {
		flex: '1 1 auto',
		textAlign: 'center'
	},
	toolEditPane_resizeSection: {
	},
	toolEditPane_resizeForm: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	toolEditPane_sizeForm: {
		display: 'flex',
	},
	sizeForm_field: {
		position: 'relative',
		flex: '1 1 auto'
	},
	sizeForm_label: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		padding: '12px',
		left: 0,
		top: 0,
		bottom: 0,
		color: 'white',
		opacity: 0.33,
		pointerEvents: 'none',
		zIndex: 1,
		fontSize: '16px'
	},
	sizeForm_labelX: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		padding: '12px',
		left: '44px',
		top: 0,
		bottom: 0,
		color: 'white',
		opacity: 0.33,
		pointerEvents: 'none',
		zIndex: 1,
		fontSize: '16px'
	},
	sizeForm_input: {
		margin: 0,
		padding: '12px',
		border: 'none',
		borderRadius: '4px',
		color: 'white',
		background: '#1a212a',
		boxShadow: '0 0 0 0 rgb(0 196 204 / 0%)',
		transition: 'box-shadow 0.2s ease-out',
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width: '100%',
		textAlign: 'right',
		fontSize: '16px',
		fontWeight: 400,
		letterSpacing: 0,
		lineHeight: 1.6,
	},
	sizeForm_lockBtn: {
		flex: '0 0 auto',
		display: 'block',
		margin: 0,
		padding: 0,
		width: '40px',
		height: '48px',
		borderRadius: '4px',
		border: 'none',
		background: 'none',
		cursor: 'pointer',
		transition: 'background 0.3s',
	},
	toolEditPane_resetBtn: {
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
		},
	},

	'@media (min-width: 1177px)': {
		toolEditPane: {
			marginTop: '-24px',
			marginBottom: '-24px'
		}
	},
}))

const Accordion = withStyles({
	root: {
		boxShadow: 'none',
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
	root: {
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
			color: theme.palette.primary.main
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
	root: {
		display: 'block',
		paddingTop: 0,
		paddingBottom: theme.spacing(2),
		paddingLeft: 0,
		paddingRight: 0
	},
}))(MuiAccordionDetails);
