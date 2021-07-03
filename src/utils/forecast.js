const request = require('postman-request')

module.exports = (latitude, longitude, callback) => {
	const weather_apiKey = '9600987fbff5b91022fcd89869b84f02';
	const url = `http://api.weatherstack.com/current?access_key=${weather_apiKey}&query=${latitude},${longitude}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service!", undefined);
		}
		else if (body.error) {
			callback(res.body.error.info, undefined);
		}
		else {
			const { current } = body;
			callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feel like ${current.feelslike} degrees out.`);
		}
	})
};