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
			const { weather_descriptions, cloudcover, temperature, feelslike } = body.current;
			callback(undefined, `${weather_descriptions[0]} with ${cloudcover} cloudcover. It is currently ${temperature} degrees out. It feel like ${feelslike} degrees out.`);
		}
	})
};