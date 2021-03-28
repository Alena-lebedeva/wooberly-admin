import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType
} from 'graphql';

const UpdateSiteSettingsType = new ObjectType({
  name: 'UpdateSiteSettings',
  fields: {
    siteName: { type: StringType },
    siteTitle: { type: StringType },
    metaDescription: { type: StringType },
    metaKeyword: { type: StringType },
    logo: { type: StringType },
    facebookAPI: { type: StringType },
    facebookAPISecret: { type: StringType },
    googleAPI: { type: StringType },
    googleAPISecret: { type: StringType },
    googleMapAPI: { type: StringType },
    googleAnalytics: { type: StringType },
    facebookLink: { type: StringType },
    twitterLink: { type: StringType },
    instagramLink: { type: StringType },
    youtubeLink: { type: StringType },
    status: { type: StringType },
    homeLogo: { type: StringType },
    errorMessage: { type: StringType }
  }
});

export default UpdateSiteSettingsType;
