const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location  
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index', {
		title: "Weather",
		name: "Ann (axxmk)",
	});
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: "About Me",
		name: "Ann (axxmk)",
	});
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: "Help",
		desc: "Need some help?",
		name: "Ann (axxmk)",
	});
})

app.get('/weather', (req, res) => {
	const { address } = req.query;

	if (!address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(address, (error, { latitude, longitude, place_name } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, weather) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				address,
				location: place_name,
				weather,
			});
		});
	});
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	console.log(req.query);
	res.send({
		products: [],
	});
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: "404",
		name: "Ann (axxmk)",
		error_message: "Help article not found.",
	});
})

app.get('*', (req, res) => {
	res.render('404', {
		title: "404",
		name: "Ann (axxmk)",
		error_message: "Page not found.",
	});
})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})