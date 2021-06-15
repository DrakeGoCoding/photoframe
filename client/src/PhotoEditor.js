import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { uploadPhoto, getPhoto } from './Axios'

export default function PhotoEditor() {
	const history = useHistory()
	const param = useParams()
	const photoId = param.id
	const classes = useStyles()

	const canvasRef = useRef(null)
	const contextRef = useRef(null)
	const ratioRef = useRef(1)

	const [image, setImage] = useState(null)
	const [isDrawing, setIsDrawing] = useState(false)

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY, which } = nativeEvent;
		// Only draw while left mouse is held
		if (which !== 1)
			return

		contextRef.current.beginPath()
		contextRef.current.moveTo(offsetX / ratioRef.current, offsetY / ratioRef.current)
		setIsDrawing(true)
	}

	const finishDrawing = () => {
		contextRef.current.closePath()
		setIsDrawing(false)
	}

	const draw = ({ nativeEvent }) => {
		if (!isDrawing)
			return

		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX / ratioRef.current, offsetY / ratioRef.current)
		contextRef.current.stroke()
	}

	const renderCanvas = (canvasRef, image) => {
		const canvas = canvasRef.current
		canvas.width = image.width
		canvas.height = image.height

		const wRatio = canvas.offsetWidth / image.width
		const hRatio = canvas.offsetHeight / image.height
		const ratio = Math.min(wRatio, hRatio)
		ratioRef.current = ratio

		const context = canvas.getContext('2d')
		context.lineCap = 'round'
		context.strokeStyle = 'black'
		context.lineWidth = 5

		context.clearRect(0, 0, canvas.width, canvas.height)
		context.drawImage(image, 0, 0, image.width, image.height)
		contextRef.current = context
	}

	const resetCanvas = () => {
		const canvas = canvasRef.current
		const context = contextRef.current
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.drawImage(image, 0, 0, image.width, image.height)
	}

	const handleDownload = () => {
		const link = document.createElement('a')
		link.download = `${photoId}.jpg`
		link.href = canvasRef.current.toDataURL('image/jpg')
		link.click()
	}

	const handleSave = async () => {
		const urlSource = canvasRef.current.toDataURL('image/jpg')
		try {
			const result = await uploadPhoto({ data: urlSource })
			console.log(result.data);
		} catch (error) {
			console.log(error.response);
		}
	}

	const handleResize = () => {
		const canvas = canvasRef.current
		const wRatio = canvas.offsetWidth / image.width
		const hRatio = canvas.offsetHeight / image.height
		const ratio = Math.min(wRatio, hRatio)
		ratioRef.current = ratio
	}

	useEffect(() => {
		if (photoId) {
			getPhoto(photoId).then(res => {
				const url = res.data.url
				const image = document.createElement('img')
				image.src = url
				image.crossOrigin = "anonymous"
				image.onload = () => setImage(image)
			}).catch(error => {
				setImage(null)
			})
		} else {
			setImage(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (image) {
			window.addEventListener('resize', handleResize)
			return () => window.removeEventListener('resize', handleResize)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (image && canvasRef)
			renderCanvas(canvasRef, image)
	}, [image, canvasRef])

	return (
		<div className={classes.background}>
			<div className={classes.container}>
				<div className={classes.toolbarSection}>
					<div className={classes.toolbar}>
						<div className={classes.toolbarTabs}>

						</div>
						<div className={classes.toolbarPane}>

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
								<Button className={classes.headerBar_saveBtn} variant="contained" color="primary" onClick={handleSave}>
									<SaveIcon className={classes.headerBar_saveIcon} />
									<span className={classes.headerBar_saveLabel}>Save</span>
								</Button>
								<Button className={classes.headerBar_downloadBtn} variant="contained" color="primary" onClick={handleDownload}>
									<SaveAltIcon className={classes.headerBar_downloadIcon} />
									<span className={classes.headerBar_saveLabel}>Download</span>
								</Button>
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
												<canvas
													className={classes.canvasImage_canvas}
													onMouseDown={startDrawing}
													onMouseUp={finishDrawing}
													onMouseMove={draw}
													ref={canvasRef} />
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
							<Button className={classes.footerBar_cancelBtn} variant="contained" color="primary" onClick={resetCanvas}>Cancel</Button>
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
		background: '#232C38'
	},
	toolbarPane: {
		position: 'relative',
		width: '320px',
		height: '100%',
		background: '#232C38'
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
		width: '100%',
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
