import React, { useState } from 'react'
import { useHistory } from 'react-router'

import { uploadPhoto } from './Axios'

// Test upload photo to db

export default function Upload() {
	const history = useHistory()
	const [previewSource, setPreviewSource] = useState('')

	const changePhoto = e => {
		const file = e.target.files[0]
		if (!file) return
		previewFile(file)
	}

	const previewFile = file => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setPreviewSource(reader.result)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!previewSource) return
		try {
			const result = await uploadPhoto({ data: previewSource })
			history.push(`/editor/${result.data.cloudinaryId}`)
		} catch (error) {
			console.log(error.response)
		}
	}

	return (
		<div>
			<div>Test upload photo</div>
			<form onSubmit={handleSubmit}>
				<input type="file" name="image" onChange={changePhoto} />
				<button type="submit">Submit</button>
			</form>
			{previewSource && (
				<img src={previewSource} alt="chosen" style={{ height: '300px' }} />
			)}
		</div>
	)
}
