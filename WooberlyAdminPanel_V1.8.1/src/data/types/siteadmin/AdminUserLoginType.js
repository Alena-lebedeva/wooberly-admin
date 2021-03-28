import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const AdminUserLoginType = new ObjectType({
  name: 'adminUserLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    isSuperAdmin: { type: BooleanType },
    token: { type: StringType },
    status: { type: IntType  },
    errorType: { type: StringType },
    errorMessage: { type: StringType }
  },
});

export default AdminUserLoginType;
