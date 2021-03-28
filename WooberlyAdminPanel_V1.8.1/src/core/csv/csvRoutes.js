var csv = require('csv-express')

import {
	getUsers,
	getBookings
} from './adminData';

const csvRoutes = app => {

	app.get('/export-admin-data', async function (req, res) {

		var type = req.query.type;
		// let userType = req.query.usertype
		let keyword = req.query.keyword;
		let status = req.query.status;

		if (req.user && req.user.admin && type) {
			let data = [];
			if (type === 'riders') {
				data = await getUsers(keyword, 1);
			} else if (type === 'drivers') {
				data = await getUsers(keyword, 2);
			} else if (type === 'bookings') {
				data = await getBookings(keyword, status, type);
			} else if (type === 'payout') {
				data = await getBookings(keyword, status, type);
			} else if (type === 'schedule-bookings') {
				data = await getBookings(keyword, null, type);
			}
			res.setHeader('Content-disposition', 'attachment; filename=' + type + '-data.csv');
			res.set('Content-Type', 'text/csv');
			res.csv(data, true);
		} else {
			res.redirect('/');
		}
	})
};

export default csvRoutes;