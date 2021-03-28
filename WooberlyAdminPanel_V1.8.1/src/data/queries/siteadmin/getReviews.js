import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql'

import { Reviews } from '../../models'
import ReviewsWholeType from '../../types/siteadmin/ReviewsWholeType'

import sequelize from '../../sequelize';

const getReviews = {

    type: ReviewsWholeType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
        if (request.user && request.user.admin) {
            let limit = 10;
            let offset = 0;
            let reviewsData, reviewsCountLength, keywordFilter;
            if (currentPage) {
                offset = (currentPage - 1) * limit
                keywordFilter = [
                    {
                        bookingId: {
                            or: [
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStart like '%${searchList}%'`)] },
                            ]
                        }
                    },
                    { authorId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { userId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { ratings: { in: [sequelize.literal(`SELECT ratings FROM Reviews WHERE ratings like '%${searchList}%'`)] } },
                    { reviewContent: { in: [sequelize.literal(`SELECT reviewContent FROM Reviews WHERE reviewContent like '%${searchList}%'`)] } },
                ];

                if (searchList && searchList != '') {

                    reviewsData = await Reviews.findAll({
                        limit,
                        offset,
                        where: {
                            or: keywordFilter
                        },
                        order: [['id', 'DESC']],
                    });
                    reviewsCountLength = await Reviews.count({
                        where: {
                            or: keywordFilter
                        }
                    });

                } else {
                    reviewsData = await Reviews.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                    });
                    reviewsCountLength = await Reviews.count({});
                }

                return {
                    reviewsData,
                    count: reviewsCountLength
                }
            }

        }
    } 
}

export default getReviews;

/*
select a.bookingId, a.userId as userId1, a.ratings as ratings1, 
b.userId as userId2, b.ratings as ratings2 
from Reviews a, Reviews b 
where a.bookingId=696 and b.bookingId=696 and a.bookingId = b.bookingId;
*/