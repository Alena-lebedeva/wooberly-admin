import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
} from 'graphql';

const AdminUserLogoutType = new ObjectType({
    name: 'AdminLogout',
    fields: {
        status: { type: IntType },
    }
})

export default AdminUserLogoutType;