import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { PrecautionNotification, TempImages } from "../../../models";

//Types
import PrecautionNotificationCommonType from "../../../types/siteadmin/PrecautionNotification/PrecautionNotificationCommonType";

const updatePrecautionNotification = {

    type: PrecautionNotificationCommonType,

    args: {
        id: {
            type: IntType
        },
        title: {
            type: new NonNull(StringType)
        },
        description: {
            type: new NonNull(StringType)
        },
        isEnabled: {
            type: new NonNull(BooleanType)
        },
        imageName: {
            type: StringType
        }
    },

    async resolve({ request, response }, { id, title, description, isEnabled, imageName }) {
        try {
            if (request.user && request.user.admin) {
                let result;

                if (id) {
                    result = await PrecautionNotification.update({
                        title,
                        description,
                        isEnabled,
                        imageName
                    }, { where: { id } });
                } else {
                    result = await PrecautionNotification.create({
                        title,
                        description,
                        isEnabled,
                        imageName
                    });
                }

                await TempImages.update({ fileName: null },
                    {
                        where: {
                            tableName: 'PrecautionNotification',
                            fieldName: 'imageName'
                        }
                    });

                return await {
                    status: !result ? 400 : 200,
                    errorMessage: !result ? "Oops, something went wrong. Please try again." : null
                };
            }
            else {
                return {
                    status: 500,
                    errorMessage: 'Please login with your account and continue.'
                };
            }
        }
        catch (error) {
            return {
                status: 400,
                errorMessage: "Something went wrong " + error
            };
        }
    }
};

export default updatePrecautionNotification;

/*
    mutation updatePrecautionNotification(
        $id:Int,
        $title:String!,
        $description:String!,
        $isEnabled:Boolean!,
        $imageName:String) {
            updatePrecautionNotification(
                id:$id,
                title:$title,
                description:$description,
                isEnabled:$isEnabled,
                imageName:$imageName) {
                    status
                    errorMessage
            }
    }
*/