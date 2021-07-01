import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

import Toolbar from './toolbar/Toolbar';
import Headerbar from './headerbar/Headerbar';
import Footerbar from './footerbar/Footerbar';

import { deletePhotoById, getPhotoById, uploadPhoto } from '../Axios'
import { getImageDataUrl } from '../utils/utils';
import Canvas from './canvas/Canvas';

export default function Editor() {
	const history = useHistory()
	const { id } = useParams()
	const classes = useStyles()
	const imageRef = useRef(null)

	const DEFAULT_DATA = {
		owner: undefined,
		id: undefined,
		url: undefined,
		width: undefined,
		height: undefined,
		format: undefined,
		uploadedAt: undefined
	}
	const DEFAULT_SERVICES = [
		{
			name: 'Filter',
			active: false,
		},
		{
			name: 'Edit',
			active: false,
		},
		{
			name: 'Text',
			active: false,
		}
	]
	const DEFAULT_FILTERS = [
		{
			name: 'Brightness',
			property: 'brightness',
			value: 100,
			range: {
				min: 50,
				max: 150,
				step: 1
			},
			unit: '%'
		},
		{
			name: 'Contrast',
			property: 'contrast',
			value: 100,
			range: {
				min: 50,
				max: 150,
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
		// {
		// 	name: 'Grayscale',
		// 	property: 'grayscale',
		// 	value: 0,
		// 	range: {
		// 		min: 0,
		// 		max: 100,
		// 		step: 1
		// 	},
		// 	unit: '%'
		// },
		// {
		// 	name: 'Opacity',
		// 	property: 'opacity',
		// 	value: 100,
		// 	range: {
		// 		min: 0,
		// 		max: 100,
		// 		step: 1
		// 	},
		// 	unit: '%'
		// },
		{
			name: 'Blur',
			property: 'blur',
			value: 0,
			range: {
				min: 0,
				max: 5,
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
		{
			name: 'Sepia',
			property: 'sepia',
			value: 0,
			range: {
				min: 0,
				max: 100,
				step: 1
			},
			unit: '%'
		},
	]
	const DEFAULT_EDITS = [
		{
			name: 'Rotate',
			property: 'rotate',
			value: 0,
			active: true
		},
		{
			name: 'Flip',
			property: 'scale',
			value: {
				x: 1,
				y: 1,
			},
			active: false
		},
		// {
		// 	name: 'Crop',
		// 	active: false
		// },
		{
			name: 'Resize',
			property: 'scale',
			value: {
				x: 1.0,
				y: 1.0,
			},
			active: false
		},
	]

	const [imageData, setImageData] = useState(DEFAULT_DATA)
	const [imageServices, setImageServices] = useState(DEFAULT_SERVICES)
	const [imageFilters, setImageFilters] = useState(DEFAULT_FILTERS)
	const [imageEdits, setImageEdits] = useState(DEFAULT_EDITS)
	const [imageText, setImageText] = useState('')
	const [visibleBackBtn, setVisibleBackBtn] = useState(false)

	const handleShowPane = (pos) => {
		setImageServices([...imageServices].map((option, index) => {
			return { ...option, active: index === pos ? true : false }
		}))
	}

	const handleChangeFilter = (e, val, optionName) => {
		setImageFilters([...imageFilters].map(option => {
			return option.name === optionName ? { ...option, value: val } : option
		}))
	}

	const handleChangeEdit = (e, val, optionName) => {
		setImageEdits([...imageEdits].map(option => {
			return option.name === optionName ? { ...option, value: val } : option
		}))
	}

	const handleChangeText = (text) => {
		setImageText(text)
	}

	const setActiveEdit = (optionName) => {
		setImageEdits([...imageEdits].map(option => {
			return { ...option, active: (option.name === optionName) ? true : false }
		}))
	}

	const resetFilters = () => {
		setImageFilters(DEFAULT_FILTERS)
	}

	const resetEdits = () => {
		setImageEdits(DEFAULT_EDITS)
	}

	const handleDownload = () => {
		const link = document.createElement('a')
		link.download = `${imageData.id}.${imageData.format}`
		const rotateValue = imageEdits.find(option => option.name === 'Rotate').value
		const flipValue = imageEdits.find(option => option.name === 'Flip').value;
		const resizeValue = imageEdits.find(option => option.name === 'Resize').value;
		link.href = getImageDataUrl(imageRef.current, imageData.width, imageData.height, imageData.format, rotateValue, flipValue, resizeValue)
		link.click()
	}

	const handleSave = async () => {
		const saveConfirmed = window.confirm('This cannot be undone. Are you sure to save changes? ')
		if (saveConfirmed) {
			const source = getImageDataUrl(imageRef.current, imageData.width, imageData.height, imageData.format)
			try {
				await uploadPhoto({ data: source })
				await deletePhotoById(id)
				history.push('/')
			} catch (error) {
				console.log(error.response);
			}
		}
	}

	const handleCancel = () => {
		window.confirm('Your changes will not be saved. Are you sure to cancel?') && history.push('/')
	}

	const getImageStyle = () => {
		const filters = imageFilters.map(option => `${option.property}(${option.value}${option.unit})`)
		const edits = imageEdits.map(option => {
			if (option.name === 'Rotate') {
				return `${option.property}(${option.value}deg)`
			}
			if (option.name === 'Flip') {
				return `${option.property}(${option.value.x},${option.value.y})`
			}
			if (option.name === 'Resize') {
				return `${option.property}(${option.value.x},${option.value.y})`
			}
			if (option.name === 'Crop') {
				return ``
			}
			return null
		})
		return { filter: filters.join(' '), transform: edits.join(' ') }
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getPhotoById(id)
				const data = res.data
				setImageData({
					owner: data.owner.name,
					id: data.cloudinaryId,
					url: data.url,
					width: data.width,
					height: data.height,
					format: data.format,
					uploadedAt: data.uploadedAt
				})
			} catch (error) {
				setImageData(null)
				console.log(error.response.data);
			}
		}
		fetchData()
	}, [id])

	return (
		<div className={classes.background}>
			<div className={classes.container}>
				<div className={classes.toolbarSection}>
					<Toolbar
						data={imageData}
						services={imageServices}
						filters={imageFilters}
						edits={imageEdits}
						text={imageText}
						handleShowPane={handleShowPane}
						handleChangeFilter={handleChangeFilter}
						handleChangeEdit={handleChangeEdit}
						handleChangeText={handleChangeText}
						setActiveEdit={setActiveEdit}
						resetFilters={resetFilters}
						resetEdits={resetEdits}
						visibleBackBtn={visibleBackBtn}
						setVisibleBackBtn={setVisibleBackBtn} />
				</div>

				<div className={classes.mainSection}>
					<div className={classes.headerBarSection}>
						<Headerbar
							handleShowPane={handleShowPane}
							handleDownload={handleDownload}
							handleSave={handleSave}
							visibleBackBtn={visibleBackBtn}
							setVisibleBackBtn={setVisibleBackBtn}
						/>
					</div>

					<div className={classes.canvasSection}>
						<Canvas
							imageData={imageData}
							imageRef={imageRef}
							style={getImageStyle()} />
					</div>

					<div className={classes.footerBarSection}>
						<Footerbar handleCancel={handleCancel} />
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

	/*----------- MAIN ----------- */
	mainSection: {
		flex: '1 0 auto',
		display: 'flex',
		flexDirection: 'column',
		zIndex: 1
	},

	headerBarSection: {
		flex: '0 0 auto',
		zIndex: 3
	},

	canvasSection: {
		flex: '1 0 auto',
		display: 'flex',
		justifyContent: 'stretch',
		alignItems: 'stretch',
		zIndex: 1
	},

	footerBarSection: {
		flex: '0 0 auto',
		zIndex: 2,
	},

	'@media (min-width: 1177px)': {

	},

	'@media (max-width: 1176px)': {
		container: {
			flexDirection: 'column-reverse'
		},
		footerBarSection: {
			display: 'none'
		},
	},
}))
