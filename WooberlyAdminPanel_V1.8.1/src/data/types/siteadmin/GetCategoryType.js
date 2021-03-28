import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

import CategoryType from './CategoryType';

const GetCategoryType = new ObjectType({
    name: 'GetCategoryType',
    fields: {
        result: {
            type: new List(CategoryType)
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    },
});

export default GetCategoryType;