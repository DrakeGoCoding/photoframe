import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

import Toolbar from './toolbar/Toolbar';
import Headerbar from './headerbar/Headerbar';
import Footerbar from './footerbar/Footerbar';

import { getPhotoById } from '../Axios'
import { getImageDataUrl } from '../utils/utils';
import Canvas from './canvas/Canvas';

export default function Editor() {
	const history = useHistory()
	const { id } = useParams()
	const classes = useStyles()
	const imageRef = useRef(null)

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

	const [imageData, setImageData] = useState({
		owner: undefined,
		id: undefined,
		url: undefined,
		width: undefined,
		height: undefined,
		format: undefined,
		uploadedAt: undefined
	})

	const [imageServices, setImageServices] = useState(DEFAULT_SERVICES)
	const [imageFilters, setImageFilters] = useState(DEFAULT_FILTERS)
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

	const resetFilters = () => {
		setImageFilters(DEFAULT_FILTERS)
	}

	const handleDownload = () => {
		const link = document.createElement('a')
		link.download = `${imageData.id}.${imageData.format}`
		link.href = getImageDataUrl(imageRef.current, imageData.width, imageData.height, imageData.format)
		link.click()
	}

	const handleSave = async () => {

	}

	const cancelEdit = () => {
		history.push('/')
	}

	const getImageStyle = () => {
		const filters = imageFilters.map(option => `${option.property}(${option.value}${option.unit})`)
		return { filter: filters.join(' ') }
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
				console.log(error.response);
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
						handleShowPane={handleShowPane}
						handleChangeFilter={handleChangeFilter}
						resetFilters={resetFilters}
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
						<Footerbar cancelEdit={cancelEdit} />
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
