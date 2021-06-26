import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ToolbarEditPane() {
	const classes = useStyles()
	const [expanded, setExpanded] = useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<div className={classes.toolEditPane}>
			<Accordion className={classes.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary
					className={classes.accordion_label}
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
					Rotate
				</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
			<Accordion className={classes.accordion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary
					className={classes.accordion_label}
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
					Flip
				</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
			<Accordion className={classes.accordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary
					className={classes.accordion_label}
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
					Crop
				</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
			<Accordion className={classes.accordion} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary
					className={classes.accordion_label}
					expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
					Resize
				</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
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
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);
