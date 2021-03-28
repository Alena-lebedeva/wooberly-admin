import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql'

import CategoryType from './CategoryType';

const CategoryManagementWholeType = new ObjectType({
    name: 'CategoryManagementWholeType',
    fields: {
        categoryData: {
            type: new List(CategoryType)
        },
        count: {
            type: IntType
        }
    }
});

export default CategoryManagementWholeType;