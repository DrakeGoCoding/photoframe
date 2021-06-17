import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Slider, Tooltip, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TuneIcon from '@material-ui/icons/Tune';
import CropIcon from '@material-ui/icons/Crop';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { uploadPhoto, getPhoto } from './Axios'
import { getImageDataUrl } from './utils';

export default function PhotoEditor() {
	const history = useHistory()
	const param = useParams()
	const photoId = param.id
	const classes = useStyles()

	const imageRef = useRef(null)
	const filterBtnRef = useRef(null)
	const editBtnRef = useRef(null)
	const textBtnRef = useRef(null)

	const [imageData, setImageData] = useState({
		owner: undefined,
		id: undefined,
		url: undefined,
		width: undefined,
		height: undefined,
		format: undefined
	})

	const DEFAULT_FILTERS = [
		{
			name: 'Brightness',
			property: 'brightness',
			value: 100,
			range: {
				min: 0,
				max: 200,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Contrast',
			property: 'contrast',
			value: 100,
			range: {
				min: 0,
				max: 200,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Saturation',
			property: 'saturate',
			value: 100,
			range: {
				min: 0,
				max: 200,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Grayscale',
			property: 'grayscale',
			value: 0,
			range: {
				min: 0,
				max: 100,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Opacity',
			property: 'opacity',
			value: 100,
			range: {
				min: 0,
				max: 100,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Blur',
			property: 'blur',
			value: 0,
			range: {
				min: 0,
				max: 10,
				step: 0.1
			},
			unit: 'px'
		},
		{
			name: 'Invert',
			property: 'invert',
			value: 0,
			range: {
				min: 0,
				max: 100,
				step: 1
			},
			unit: '%'
		},
	]
	const [imageFilters, setImageFilters] = useState(DEFAULT_FILTERS)

	const [activeBtns, setActiveBtns] = useState([true, false, false])

	const activateBtn = (index) => {
		const activeBtns = [false, false, false]
		activeBtns[index] = true
		setActiveBtns(activeBtns)
	}

	const showFilterPane = () => {
		activateBtn(0)
	}

	const showEditPane = () => {
		activateBtn(1)
	}

	const showTextPane = () => {
		activateBtn(2)
	}

	const handleChangeFilter = (e, val, optionName) => {
		setImageFilters([...imageFilters].map(option => {
			return option.name === optionName ? { ...option, value: val } : option
		}))
	}

	const handleDownload = () => {
		const link = document.createElement('a')
		link.download = `${photoId}.${imageData.format}`
		link.href = getImageDataUrl(imageRef.current, imageData.width, imageData.height, imageData.format)
		link.click()
	}

	const handleSave = async () => {

	}

	const cancelEdit = () => {

	}

	const getImageStyle = () => {
		const filters = imageFilters.map(option => {
			return `${option.property}(${option.value}${option.unit})`
		})
		return { filter: filters.join(' ') }
	}

	useEffect(() => {
		if (photoId) {
			getPhoto(photoId).then(res => {
				const data = res.data
				// console.log(data);
				setImageData({
					owner: data.owner.name,
					id: data.cloudinaryId,
					url: data.url,
					width: data.width,
					height: data.height,
					format: data.format
				})
			}).catch(error => {
				console.log(error.response);
				setImageData(null)
				history.push('/upload')
			})
		}
	}, [])

	return (
		<div className={classes.background}>
			<div className={classes.container}>
				<div className={classes.toolbarSection}>
					<div className={classes.toolbar}>
						<div className={classes.toolbarTabs}>
							<Tooltip title="Filter" arrow>
								<button className={activeBtns[0] ? classNames(classes.toolbarTabs_tab, classes.toolbarTabs_tab_active) : classes.toolbarTabs_tab} onClick={showFilterPane} ref={filterBtnRef}>
									<TuneIcon className={classes.toolbarTabs_tuneIcon} />
								</button>
							</Tooltip>
							<Tooltip title="Edit" arrow>
								<button className={activeBtns[1] ? classNames(classes.toolbarTabs_tab, classes.toolbarTabs_tab_active) : classes.toolbarTabs_tab} onClick={showEditPane} ref={editBtnRef}>
									<CropIcon className={classes.toolbarTabs_cropIcon} />
								</button>
							</Tooltip>
							<Tooltip title="Text" arrow>
								<button className={activeBtns[2] ? classNames(classes.toolbarTabs_tab, classes.toolbarTabs_tab_active) : classes.toolbarTabs_tab} onClick={showTextPane} ref={textBtnRef}>
									<TextFieldsIcon className={classes.toolbarTabs_textIcon} />
								</button>
							</Tooltip>
						</div>
						<div className={classes.toolbarPane}>
							<div className={activeBtns[0] ? classNames(classes.toolbarPane_childWrapper, classes.toolbarPane_childWrapper_active) : classes.toolbarPane_childWrapper}>
								<div className={classes.toolbarPane_childContent}>
									<div className={classes.toolFilterPane}>
										<section className={classes.toolFilterPane_section}>
											<Typography className={classes.toolFilterPane_sectionHeading} variant="h3">Adjust</Typography>
											<div className={classes.toolFilterPane_sliderGrid}>
												{
													imageFilters.map((option, index) => {
														return <React.Fragment key={index}>
															<div className={classes.toolFilterPane_sliderLabel}>{option.name}</div>
															<div className={classes.toolFilterPane_sliderControl}>
																<Slider min={option.range.min} max={option.range.max} step={option.range.step} value={option.value} onChange={(e, val) => handleChangeFilter(e, val, option.name)} />
															</div>
														</React.Fragment>
													})
												}
											</div>
										</section>
										<section className={classes.toolFilterPane_section}>
											<button className={classes.toolFilterPane_resetBtn} onClick={() => setImageFilters(DEFAULT_FILTERS)} style={{ float: 'right' }}>Reset</button>
										</section>
									</div>
								</div>
							</div>
							<div className={activeBtns[1] ? classNames(classes.toolbarPane_childWrapper, classes.toolbarPane_childWrapper_active) : classes.toolbarPane_childWrapper}>
								<div className={classes.toolbarPane_childContent}>
									<div className={classes.toolEditPane}>

									</div>
								</div>
							</div>
							<div className={activeBtns[2] ? classNames(classes.toolbarPane_childWrapper, classes.toolbarPane_childWrapper_active) : classes.toolbarPane_childWrapper}>
								<div className={classes.toolbarPane_childContent}>
									<div className={classes.toolTextPane}>

									</div>
								</div>
							</div>
						</div>
						<div className={classes.toolbarUnibar}>

						</div>
					</div>
				</div>
				<div className={classes.mainSection}>
					<div className={classes.headerBarSection}>
						<div className={classes.headerBar}>
							<Button className={classes.headerBar_backBtn} variant="contained" color="primary">
								<ArrowBackIosIcon className={classes.headerBar_backIcon} />
							</Button>
							<Typography className={classes.headerBar_title} variant="h2">Choose an image</Typography>
							<div className={classes.headerBar_rightBtns}>
								<Tooltip title="Save" arrow>
									<Button className={classes.headerBar_saveBtn} variant="contained" color="primary" onClick={handleSave}>
										<SaveIcon className={classes.headerBar_saveIcon} />
										<span className={classes.headerBar_saveLabel}>Save</span>
									</Button>
								</Tooltip>
								<Tooltip title="Download" arrow>
									<Button className={classes.headerBar_downloadBtn} variant="contained" color="primary" onClick={handleDownload}>
										<SaveAltIcon className={classes.headerBar_downloadIcon} />
										<span className={classes.headerBar_saveLabel}>Download</span>
									</Button>
								</Tooltip>

							</div>
						</div>
					</div>
					<div className={classes.canvasSection}>
						<div className={classes.canvas}>
							<div className={classes.canvas_container} style={{ position: 'relative' }}>
								<div className={classes.canvas_container}>
									<div className={classes.canvas_image}>
										<div className={classes.canvasImage}>
											<div className={classes.canvasImage_workContainer}>
												<img
													className={classes.canvasImage_canvas}
													src={imageData ? imageData.url : ''}
													alt={imageData ? "" : "image"}
													crossOrigin="anonymous"
													ref={imageRef}
													style={getImageStyle()} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.footerBarSection}>
						<div className={classes.footerBar}>
							<div className={classes.footerBar_message}>
								<Typography className={classes.footerBar_header} variant="h2">Turn your photos into stunning graphics</Typography>
								<Typography className={classes.footerBar_subheader} variant="h3">From posters to cards and so much more - You can design anything in PhotoFrame</Typography>
							</div>
							<Tooltip title="Cancel" arrow>
								<Button className={classes.footerBar_cancelBtn} variant="contained" color="primary" onClick={cancelEdit}>Cancel</Button>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	background: {
		background: '#14191F'
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden'
	},

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
	toolbarUnibar: {
		display: 'flex',
		position: 'relative'
	},

	/*----------- MAIN ----------- */
	mainSection: {
		flex: '1 0 auto',
		display: 'flex',
		flexDirection: 'column',
		zIndex: 1
	},

	// HEADER
	headerBarSection: {
		flex: '0 0 auto',
		zIndex: 3
	},
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
		visibility: 'visible',
		transition: 'all 0.3s ease-out',
		'&:hover': {
			background: 'none',
			boxShadow: 'none',
			color: '#039be5'
		}
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


	// CANVAS
	canvasSection: {
		flex: '1 0 auto',
		display: 'flex',
		justifyContent: 'stretch',
		alignItems: 'stretch',
		zIndex: 1
	},
	canvas: {
		position: 'relative',
		padding: '32px 64px',
		width: '100%',
		background: '#14191F'
	},
	canvas_container: {
		width: '100%',
		height: '100%',
	},
	canvas_image: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1
	},
	canvasImage: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	canvasImage_workContainer: {
		position: 'absolute',
		transformOrigin: 'top left',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	},
	canvasImage_canvas: {
		imageRendering: 'pixelated',
		objectFit: 'contain',
		width: '100%',
		height: '100%'
	},

	// FOOTER
	footerBarSection: {
		flex: '0 0 auto',
		zIndex: 2,
	},
	footerBar: {
		display: 'flex',
		alignItems: 'center',
		padding: '24px',
		background: '#0e1318'
	},
	footerBar_message: {
		flex: '1 1 auto',
		textAlign: 'left',
		marginRight: '8px'
	},
	footerBar_header: {
		margin: '0 0 8px',
		fontSize: '18px',
		color: 'white',
		fontWeight: 700,
		letterSpacing: '-0.1px',
		lineHeight: 1.3
	},
	footerBar_subheader: {
		margin: 0,
		fontSize: '14px',
		color: 'rgba(255, 255, 255, 0.65)',
		fontWeight: 400,
		lineHeight: '1.6',
		letterSpacing: 0
	},
	footerBar_cancelBtn: {
		flex: '0 1 auto',
		margin: 0,
		fontSize: '14px',
		fontWeight: '600',
		padding: '11px 16px'
	},

	'@media (min-width: 1177px)': {
		toolbarUnibar: {
			display: 'none'
		},
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
		container: {
			flexDirection: 'column-reverse'
		},
		toolbar: {
			flexDirection: 'column'
		},
		toolbarTabs: {
			display: 'none'
		},
		toolbarPane: {
			display: 'none'
		},
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
		canvas: {
			padding: '24px'
		},
		footerBarSection: {
			display: 'none'
		}
	}
}))
