import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import TuneIcon from '@material-ui/icons/Tune';
import CropIcon from '@material-ui/icons/Crop';
import TextFieldsIcon from '@material-ui/icons/TextFields';

import Toolbar from './Toolbar';
import Headerbar from './Headerbar';
import Footerbar from './Footerbar';

import { uploadPhoto, getPhoto } from './Axios'
import { getImageDataUrl } from './utils';
import Canvas from './Canvas';

export default function PhotoEditor() {
	const history = useHistory()
	const param = useParams()
	const photoId = param.id
	const classes = useStyles()

	const imageRef = useRef(null)
	const backBtnRef = useRef(null)
	const toolbarRef = useRef(null)

	const DEFAULT_SERVICES = [{
		name: 'Filter',
		active: true,
		icon: <TuneIcon className={classes.toolbarTabs_tuneIcon} />,
	}, {
		name: 'Edit',
		active: false,
		icon: <CropIcon className={classes.toolbarTabs_cropIcon} />,
	}, {
		name: 'Text',
		active: false,
		icon: <TextFieldsIcon className={classes.toolbarTabs_textIcon} />,
	}]
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
		format: undefined
	})

	const [imageServices, setImageServices] = useState(DEFAULT_SERVICES)
	const [imageFilters, setImageFilters] = useState(DEFAULT_FILTERS)
	const [visibleBackBtn, setVisibleBackBtn] = useState(true)

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
				setImageData(null)
				history.push('/upload')
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={classes.background}>
			<div className={classes.container}>
				<div className={classes.toolbarSection}>
					<Toolbar
						services={imageServices}
						filters={imageFilters}
						handleShowPane={handleShowPane}
						handleChangeFilter={handleChangeFilter}
						resetFilters={resetFilters}
						toolbarRef={toolbarRef}
						visibleBackBtn={visibleBackBtn}
						setVisibleBackBtn={setVisibleBackBtn} />
				</div>

				<div className={classes.mainSection}>
					<div className={classes.headerBarSection}>
						<Headerbar
							handleShowPane={handleShowPane}
							handleDownload={handleDownload}
							handleSave={handleSave}
							backBtnRef={backBtnRef}
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
