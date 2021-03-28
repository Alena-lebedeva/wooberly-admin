import AdminDashboardType from '../../types/siteadmin/AdminDashboardType';
import { User, Booking, Currencies } from '../../models/index'

const getDashboardCount = {

    type: AdminDashboardType,

    async resolve({ request }) {
        
        const totalDriversCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2
            }
        })

        const todayDriversCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekDriversCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthDriversCount = await User.count({
            where: {
                deletedAt: null,
                userType: 2,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const totalRidersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1
            }
        })

        const todayRidersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekRidersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthRidersCount = await User.count({
            where: {
                deletedAt: null,
                userType: 1,
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const totalBookingsCount = await Booking.count({
            where: {
                and: [
                    { tripStatus: { ne: 'expired' } },
                    { tripStatus: { ne: 'declined' } }
                ]
            }
        })

        const todayBookingsCount = await Booking.count({
            where: {
                and: [
                    { tripStatus: { ne: 'expired' } },
                    { tripStatus: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            }
        })

        const weekBookingsCount = await Booking.count({
            where: {
                and: [
                    { tripStatus: { ne: 'expired' } },
                    { tripStatus: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })

        const monthBookingsCount = await Booking.count({
            where: {
                and: [
                    { tripStatus: { ne: 'expired' } },
                    { tripStatus: { ne: 'declined' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })


        const todayEarnings = await Booking.findAll({
            attributes: ['riderServiceFee', 'driverServiceFee'],
            where: {
                and: [
                    { tripStatus: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })

        const weeklyEarnings = await Booking.findAll({
            attributes: ['riderServiceFee', 'driverServiceFee'],
            where: {
                and: [
                    { tripStatus: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })

        const monthlyEarnings = await Booking.findAll({
            attributes: ['riderServiceFee', 'driverServiceFee'],
            where: {
                and: [
                    { tripStatus: { eq: 'completed' } }
                ],
                createdAt: {
                    lt: new Date(),
                    gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
                }
            },
            raw: true
        })
        
        const totalEarnings = await Booking.findAll({
            attributes: ['riderServiceFee', 'driverServiceFee'],
            where: {
                and: [
                    { tripStatus: { eq: 'completed' } }
                ]
            },
            raw: true
        })

        const currency = await Currencies.findOne({
            where: {
                isBaseCurrency: true
            }
        })

        const prevCurrency = await Currencies.findAll({
            order: [['updatedAt', 'DESC']] ['isBaseCurrency', 'DESC'],
            raw: true
        });

        const prevCurrencySymbol = prevCurrency[0].symbol

        return {
            totalDriversCount,
            todayDriversCount,
            weekDriversCount,
            monthDriversCount,
            totalRidersCount,
            todayRidersCount,
            weekRidersCount,
            monthRidersCount,
            totalBookingsCount,
            todayBookingsCount,
            weekBookingsCount,
            monthBookingsCount,
            todayEarnings,
            weeklyEarnings,
            monthlyEarnings,
            totalEarnings,
            currency: prevCurrencySymbol
        }
    }
}

export default getDashboardCount;