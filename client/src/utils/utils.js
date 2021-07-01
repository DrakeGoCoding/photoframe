export const checkName = (input) => input.length > 0
export const checkEmail = (input) => input.length > 0
export const checkPassword = (input) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	return input.match(regex)
}

export function setCookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export function getImageDataUrl(img, width, height, format, rotateValue = 0, flipValue = { x: 1, y: 1 }, resizeValue = { x: 1, y: 1 }) {
	const canvas = document.createElement('canvas');
	// canvas.width = width;
	// canvas.height = height;

	canvas.width = width * resizeValue.x;
	canvas.height = height * resizeValue.y;

	const ctx = canvas.getContext('2d');
	ctx.filter = img.style.filter

	ctx.setTransform(
		flipValue.x,
		0,
		0,
		flipValue.y,
		flipValue.x === -1 ? canvas.width : 0,
		flipValue.y === -1 ? canvas.height : 0
	)
	ctx.scale(resizeValue.x, resizeValue.y)
	// ctx.rotate(rotateValue * Math.PI / 180)
	console.log(canvas);

	ctx.drawImage(img, 0, 0);

	return canvas.toDataURL(`image/${format}`)
}

export function convertStringToDate(strDate) {
	const date = new Date(strDate)
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
}