import { makeStyles } from '@material-ui/core'
import React from 'react'

function Canvas({ imageData, imageRef, style }) {
	const classes = useStyles()

	return (
		<div className={classes.canvas}>
			<div className={classes.canvas_container} style={{ position: 'relative' }}>
				<div className={classes.canvas_container}>
					<div className={classes.canvas_image}>
						<div className={classes.canvasImage}>
							<div className={classes.canvasImage_workContainer} >
								<figure>
									<img
										className={classes.canvasImage_canvas}
										src={imageData ? imageData.url : ''}
										alt={imageData ? "" : "image"}
										crossOrigin="anonymous"
										ref={imageRef}
										style={style} />
								</figure>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
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

	'@media (max-width: 1176px)': {
		canvas: {
			padding: '24px'
		},

	},
}))

export default React.memo(Canvas)