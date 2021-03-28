import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql'

import HomePageType from './HomePageType';

const HomePageWholeType = new ObjectType({
    name: 'HomePageWholeType',
    fields: {
        homePageData: {
            type: new List(HomePageType)
        }
    }
});

export default HomePageWholeType;