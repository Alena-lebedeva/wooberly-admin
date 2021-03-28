import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const UserProfileType = new ObjectType({
  name: 'UserProfile',
  fields: {
    userId: { type: ID },
    firstName: { type: StringType },
    lastName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    status: { type: StringType },
    country: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    verificationCode: { type: IntType },
    licenceFront: { type: StringType },
    licenceBack: { type: StringType },
    profileId: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    picture: {
      type: StringType,
    },
    createdAt: {
      type: StringType
    },
    displayName: {
      type: StringType,
    },
    countryCode: { type: StringType },
    preferredPaymentMethod: {
      type: BooleanType
    },
    licenceFrontName: {
      type: StringType,
      async resolve(account) {
        let name = account.licenceFront ? 'images/upload/' + account.licenceFront : '';
        return name;
      }
    },
    licenceBackName: {
      type: StringType,
      async resolve(account) {
        let name = account.licenceBack ? 'images/upload/' + account.licenceBack : '';
        return name;
      }
    },
    walletBalance: { type: FloatType },
    uploadStatus: { type: StringType },
    errorMessage: { type: StringType },
    status: { type: StringType }
  },
});

export default UserProfileType;
