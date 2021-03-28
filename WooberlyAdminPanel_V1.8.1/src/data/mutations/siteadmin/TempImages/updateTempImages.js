import {
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import TempImagesType from '../../../types/siteadmin/TempImages/TempImagesType';

import { TempImages } from '../../../models';

const updateTempImages = {

    type: TempImagesType,

    args: {
        tableName: { type: StringType },
        fieldName: { type: StringType },
        fileName: { type: StringType },
    },

    async resolve({ request, response }, { tableName, fieldName, fileName }) {
        
        if (request.user && request.user.admin) {

            const tempImagesExist = await TempImages.findOne({
                where: {
                    tableName,
                    fieldName
                },
                raw: true
            });

            if (tempImagesExist) {

                const updateTempImage = await TempImages.update({
                    fileName
                }, 
                {
                    where: {
                        tableName,
                        fieldName
                    },
                    raw: true
                });

                if (updateTempImage) {
                    return {
                        status: 200
                    }
                } else {
                    return {
                        status: 400
                    }
                }

            } else {

                const addTempImages = await TempImages.create({
                    tableName,
                    fieldName,
                    fileName
                });

                if (addTempImages) {
                    return {
                        status: 200
                    };
                } else {
                    return {
                        status: 400
                    };
                };
            }
        } else {
            return {
                status: 500
            };
        };
    }
};

export default updateTempImages