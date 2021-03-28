import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql'

import ReviewsType from './ReviewsType';

const ReviewsWholeType = new ObjectType({
    name: 'ReviewsWholeType',
    fields: {
        reviewsData: {
            type: new List(ReviewsType)
        },
        count: {
            type: IntType
        }
    }
});

export default ReviewsWholeType;