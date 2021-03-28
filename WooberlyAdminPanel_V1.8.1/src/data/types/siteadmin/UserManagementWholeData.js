import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import UserType from './UserType';

const UserManagementWholeType = new ObjectType({
    name: 'UserManagementWholeType',
    fields: {
        userData: {
            type: new List(UserType)
        },
        count: {
            type: IntType
        }
    }
});

export default UserManagementWholeType;