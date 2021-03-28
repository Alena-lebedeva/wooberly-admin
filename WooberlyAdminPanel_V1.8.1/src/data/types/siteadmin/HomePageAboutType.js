import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
  } from 'graphql';
  
  const HomePageType = new ObjectType({
    name: 'HomePage',
    fields: {
      id: { type: IntType },
      title: { type: StringType },
      name: { type: StringType },
      value: { type: StringType },
      status: { type: StringType }
    },
  });
  
  export default HomePageType;
  