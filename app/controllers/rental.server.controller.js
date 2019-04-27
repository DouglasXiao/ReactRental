var superagent = require('superagent');
var cheerio = require('cheerio');

const insertOneLine = require('../models/rental.server.model').insertOneLine;

function tryToCrawWeb(url, socket) {
	superagent
		.get(url)
		.end(function(err, res) {
			var $ = cheerio.load(res.text);
			var dom = $('li').filter(function(index, element) {
				return $(this).text() === 'sublets / temporary';
			}).html();

			var theHref = cheerio.load(dom).root().find('a').attr('href');
			console.log("The next level href is: " + (url + theHref));

			superagent
				.get(url + theHref)
				.end(function(err, res) {
					var $ = cheerio.load(res.text);
					$('.result-row').each(function(index, element) {
						var theHref2 = cheerio.load($(this).html()).root().find('a').attr('href');
						// console.log("For each rental page, the href is: " + theHref2);

						superagent
							.get(theHref2)
							.end(function(err, res) {
								var $ = cheerio.load(res.text);

								var lat = '';
								var lng = '';
								var locationUrl = theHref2;
								var title = $('title').html();
								var thumbnail = '';
								var address = $('div[class=mapaddress]').html();

								// console.log("The map address is: " + address);
								console.log("The title is: " + title);

								// select all elements
								$('*').each(function(index, element) {
									if ($(element).attr('id') === 'map') {
										lat = $(element)['0']['attribs']['data-latitude'];
										lng = $(element)['0']['attribs']['data-longitude'];
									}

									if ($(element).attr('property') === 'og:image') {
										thumbnail = $(element)['0']['attribs']['content'];
										console.log("thumbnail: " + thumbnail);
									}
								});

								if (socket !== undefined) {
									socket.emit('serverToClientChannel', {lat: lat, lng: lng, locationUrl: locationUrl, title: title, thumbnail: thumbnail, address: address});
								}

								//insertOneLine({lat: lat, lng: lng, locationUrl: locationUrl, title: title, thumbnail: thumbnail, address: address});
							});
					});
				});
		});
}

function tryToCrawWeb_test(url, dbInstance) {
	superagent
		.get(url)
		.end(function(err, res) {
			var $ = cheerio.load(res.text);
			var dom = $('li').filter(function(index, element) {
				return $(this).text() === 'sublets / temporary';
			}).html();

			var theHref = cheerio.load(dom).root().find('a').attr('href');
			console.log("The next level href is: " + (url + theHref));

			superagent
				.get(url + theHref)
				.end(function(err, res) {
					var $ = cheerio.load(res.text);
					$('.result-row').each(function(index, element) {
						var theHref2 = cheerio.load($(this).html()).root().find('a').attr('href');
						// console.log("For each rental page, the href is: " + theHref2);

						superagent
							.get(theHref2)
							.end(function(err, res) {
								var $ = cheerio.load(res.text);

								var lat = '';
								var lng = '';
								var locationUrl = theHref2;
								var title = $('title').html();
								var thumbnail = '';
								var address = $('div[class=mapaddress]').html();

								// console.log("The map address is: " + address);
								console.log("The title is: " + title);

								// select all elements
								$('*').each(function(index, element) {
									if ($(element).attr('id') === 'map') {
										lat = $(element)['0']['attribs']['data-latitude'];
										lng = $(element)['0']['attribs']['data-longitude'];
									}

									if ($(element).attr('property') === 'og:image') {
										thumbnail = $(element)['0']['attribs']['content'];
										console.log("thumbnail: " + thumbnail);
									}
								});

								let line = {lat: lat, lng: lng, locationUrl: locationUrl, title: title, thumbnail: thumbnail, address: address};
								insertOneLine(dbInstance, line);
							});
					});
				});
		});
}

module.exports = {
	init(){
		// Could initialize something here
	},

	getRentalInfos(socket) {
		tryToCrawWeb('https://vancouver.craigslist.org', socket);
	},

	crawRentalInfos(dbInstance) {
		tryToCrawWeb_test('https://vancouver.craigslist.org', dbInstance);
	}
}
