const weatherForm = document.querySelector('form');
const inputElem = document.querySelector('input');
const message1Elem = document.getElementById('message-1');
const message2Elem = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const address = inputElem.value;

	message1Elem.textContent = 'Loading...';
	message2Elem.textContent = '';

	fetch(`/weather?address=${address}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				return message1Elem.textContent = data.error;
			}

			message1Elem.textContent = data.location;
			message2Elem.textContent = data.weather;
		});
	})
})