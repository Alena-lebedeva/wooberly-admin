import {
    User,
    UserProfile,
    Booking
} from '../../data/models';
import sequelize from '../../data/sequelize';

export async function getUsers(keyword, userType) {
    let where = {
        userType: userType,
        deletedAt: null
    };

    let attributes = [
        [sequelize.col('profile.profileId'), 'ID'],
        ['email', 'EMAIL ADDRESS'],
        ['phoneNumber', 'PHONE NUMBER'],
        ['isBan', 'BAN STATUS'],
        ['userStatus', 'USER STATUS'],
        ['createdAt', 'ACCOUNT CREATED ON'],
        [sequelize.col('profile.firstName'), 'FIRST NAME'],
        [sequelize.col('profile.lastName'), 'LAST NAME'],
        [sequelize.col('profile.country'), 'COUNTRY']
    ];

    if (userType === 1)
        attributes.push([sequelize.col('profile.walletBalance'), 'WALLET BALANCE'])

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        where['and'] = [
            {
                id: {
                    or: [
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE country like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE phoneDialCode like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE phoneNumber like '%${keyword}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM User WHERE createdAt like '%${keyword}%'`)] }
                    ]
                }
            }
        ];
    }

    try {
        const data = await User.findAll({
            attributes,
            where,
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: []
            }],
            raw: true,
            order: [['createdAt', 'DESC']],
        });

        return await data;
    }
    catch (e) {
        console.error(e);
        return [];
    }
}

export async function getBookings(keyword, status, pageType) {

    let keywordFilter = {}, tripStatusFilter = { }, cancelReasonFilter = {}, bookingTypeFilter = {};
    let attributes = [
        ['id', 'Booking ID'],
        [
            sequelize.literal(`(SELECT firstName FROM UserProfile WHERE UserProfile.userId=Booking.riderId)`),
            'Rider Name'
        ],
        [
            sequelize.literal(`(SELECT email FROM User WHERE User.id=Booking.riderId)`),
            'Rider Email'
        ],
        [
            sequelize.literal(`(SELECT firstName FROM UserProfile WHERE UserProfile.userId=Booking.driverId)`),
            'Driver Name'
        ],
        [
            sequelize.literal(`(SELECT email FROM User WHERE User.id=Booking.driverId)`),
            'Driver Email'
        ],
        ['pickUpLocation', 'PickUp Location'],
        ['dropOffLocation', 'Drop Location'],
        ['vehicleNumber', 'Vehicle Number'],
        [
            sequelize.literal(`(SELECT categoryName FROM Category WHERE Category.id=Booking.vehicleType)`),
            'Category Name'
        ],
        ['tripStart', 'Trip Start'],
        ['tripEnd', 'Trip End'],
        ['tripStatus', 'Trip Status'],
        ['totalRideDistance', 'Total Rider Distance'],
        ['totalDuration', 'Total Duration'],
        ['currency', 'Currency'],
        ['totalFare', 'Ride Fare'],
        ['tollFee', 'Toll Fee'],
        ['riderServiceFee', 'Rider Service Fee'],
        ['driverServiceFee', 'Driver Service Fee'],
        ['riderTotalFare', 'Rider Total Fare'],
        ['driverTotalFare', 'Driver Payout Amount']
    ];

    if (pageType === 'bookings' && !status) {
        bookingTypeFilter = { bookingType: 1 };
    }

    if (pageType === 'schedule-bookings') {
        bookingTypeFilter = { bookingType: 2 };
    }

    if (pageType === 'payout') {
        status = ['completed'];
        attributes.push([
            sequelize.literal(`
                CASE WHEN paymentType=1 
                    THEN 'Processed via cash'
                WHEN isPayoutPaid=true 
                    THEN 'Completed'
                ELSE 
                    'Pending'
                END
            `),
            'Payout Status'
        ]);
        attributes.push([
            sequelize.literal(`
                CASE WHEN paymentType=1 
                    THEN 
                        CASE WHEN isPayoutPaid=true 
                            THEN 'Paid'
                        ELSE 
                            'Unpaid'
                        END
                ELSE 
                    'Not Required'
                END
            `),
            'Action'
        ]);
    }

    if (status) {
        //Trip Status Filter
        tripStatusFilter = { tripStatus: { [sequelize.Op.or]: status } }

        if (status.includes('cancelledByRider') || status.includes('cancelledByDriver')) {
            //Cancel Reason Filter
            cancelReasonFilter = {
                or: [
                    { id: { in: [sequelize.literal(`SELECT bookingId FROM BookingCancelReason WHERE reason!=""`)] } },
                    { bookingType: 2 }
                ]
            };
            attributes.push([
                sequelize.literal(`(SELECT reason FROM BookingCancelReason WHERE BookingCancelReason.bookingId=Booking.id)`),
                'Cancel Reason'
            ])
        }
    }

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        //Keyword Filter
        keywordFilter = {
            or: [
                {
                    id: {
                        or: [
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE pickUpLocation like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE dropOffLocation like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE vehicleNumber like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStatus like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE totalRideDistance like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE totalDuration like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE totalFare like '%${keyword}%'`)] },
                            { in: [sequelize.literal(`SELECT id FROM Booking WHERE tollFee like '%${keyword}%'`)] }
                        ]
                    }
                },
                { riderId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] } },
                { driverId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)] } },
                { vehicleType: { in: [sequelize.literal(`SELECT id FROM Category WHERE categoryName like '%${keyword}%'`)] } }
            ]
        };
    }

    try {
        const bookingData = await Booking.findAll({
            attributes,
            where: {
                and: [
                    tripStatusFilter,
                    keywordFilter,
                    cancelReasonFilter,
                    bookingTypeFilter
                ]
            },
            raw: true,
            order: [['id', 'DESC']]
        });
        return await bookingData;
    }
    catch (e) {
        console.error(e)
        return [];
    }
}