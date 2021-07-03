const request = require('postman-request')

module.exports = (location, callback) => {
	const map_token = 'pk.eyJ1IjoiYXh4bWsiLCJhIjoiY2txOGFhZG84MDIzcDJvbDB6cm16MG53ZCJ9.LBTSvqbSoD42mHY38AK93A';
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${map_token}&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to geocoding service!", undefined);
		}
		else if (body.message) {
			callback(body.message, undefined);
		}
		else if (body.features.length === 0) {
			callback("Cannot find location", undefined);
		}
		else {
			const { center, place_name } = body.features[0];
			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				place_name,
			});
		}
	})
};