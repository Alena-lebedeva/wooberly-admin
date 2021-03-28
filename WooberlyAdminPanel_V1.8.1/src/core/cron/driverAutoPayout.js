var CronJob = require('cron').CronJob;
import each from 'sync-each';
import stripePackage from 'stripe';
import { payment } from '../../config';
const stripe = stripePackage(payment.stripe.secretKey);
import { Booking, Payout, TransactionHistory, FailedTransactionHistory, User, SiteSettings } from '../../data/models';

const driverAutoPayout = app => {

	new CronJob('0 0 0 * * *', async function () {
		
		let offset = 0;
		autoPayout(offset);

		async function autoPayout(offset) {
			const getSiteSettings = await SiteSettings.findOne({
				attributes: ['value'],
				where: {
					name: 'siteName'
				},
				raw: true
			});

			const getBooking = await Booking.findAll({
				limit: 100,
				offset,
				attributes: ['id', 'driverId', 'isTipGiven', 'riderId', 'driverTotalFare', 'totalFare', 'currency', 'tipsDriverTotalFare'],
				where: {
					tripStatus: { eq: 'completed' },
					isPayoutPaid: { eq: false },
					paymentType: { in: [2, 3] },
					isBanStatus: { eq: false }
				},
				order: [['id', 'DESC']],
				raw: true
			});

			if (getBooking && getBooking.length > 0) {
				each(getBooking, async function (bookingData, next) {
					let getpayout = await Payout.findOne({
						where: {
							userId: bookingData.driverId,
							default: { eq: true }
						},
						raw: true
					});	

					let checkUserStatus = await User.findOne({
						where: {
							id: bookingData.driverId,
							isBan: { eq: false },
							deletedAt: { eq: null }
						},
						raw: true
					});

					let driverTotalFare;
					if (bookingData.isTipGiven) {
						driverTotalFare = bookingData && bookingData.tipsDriverTotalFare;
					} else {
						driverTotalFare = bookingData && bookingData.driverTotalFare;
					}

					if (getpayout && getpayout.payEmail && checkUserStatus ) {
						try {
							let payout = await stripe.transfers.create({
								amount: Math.round(bookingData.driverTotalFare * 100),
								currency: bookingData.currency,
								destination: getpayout.payEmail,
								description: `${getSiteSettings && getSiteSettings.value} # ${bookingData.id}`
							});
							

							if (payout && payout.id) {
								let transaction = await TransactionHistory.create({
									bookingId: bookingData.id,
									driverId: bookingData.driverId,
									riderId: bookingData.riderId,
									amount: driverTotalFare,
									currency: bookingData.currency,
									transactionId: payout.id
								});

								if (transaction) {

									await Booking.update({
										isPayoutPaid: true
									}, {
										where: {
											id: bookingData.id
										}
									});
								}

								process.nextTick(next);

							} else {
								process.nextTick(next);
							}

						} catch (error) {

							let transaction = await FailedTransactionHistory.create({
								bookingId: bookingData.id,
								driverId: bookingData.driverId,
								riderId: bookingData.riderId,
								amount: driverTotalFare,
								currency: bookingData.currency,
								reason: error.message || error
							});

							process.nextTick(next);
						}

					} else {
						process.nextTick(next);
					}

				}, function (err, transformedItems) {
					
					offset = parseFloat(offset + 100);
					autoPayout(offset);
				});
			} else {

			}

		}

	}, null, true, 'America/Los_Angeles');

};

export default driverAutoPayout;