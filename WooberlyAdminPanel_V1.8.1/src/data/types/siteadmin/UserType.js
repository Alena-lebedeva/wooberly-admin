import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLID as ID
} from 'graphql';

import UserProfileType from './UserProfileType';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: ID },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    phoneDialCode: { type: StringType },
    phoneCountryCode: { type: StringType },
    password: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    userStatus: { type: StringType },
    isActive: { type: IntType },
    isBan: { type: IntType },
    userType: { type: IntType },
    createdAt: { type: StringType },
    activeStatus: { type: StringType },
    overallRating: { type: FloatType },
    status: { type: IntType },
    errorMessage: { type: StringType },
    deletedAt: { type: StringType },
    profile: {
      type: UserProfileType
    }
  },
});

export default UserType;
