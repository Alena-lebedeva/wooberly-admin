import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const TempImagesType = new ObjectType({
    name: 'TempImagesType',
    fields: {
        id: {
            type: IntType
        },
        tableName: {
            type: StringType
        },
        fieldName: {
            type: StringType
        },
        fileName: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default TempImagesType;