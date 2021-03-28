import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';

// Models
import { PrecautionNotification } from "../../../models";

//Types
import PrecautionNotificationCommonType from "../../../types/siteadmin/PrecautionNotification/PrecautionNotificationCommonType";

const updatePrecautionNotificationImage = {

    type: PrecautionNotificationCommonType,

    args: {
        id: { type: new NonNull(IntType) },
        imageName: { type: StringType }
    },

    async resolve({ request, response }, { id, imageName }) {
        try {
            if (request.user && request.user.admin) {

                const result = await PrecautionNotification.update({ imageName }, { where: { id } });
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

export default updatePrecautionNotificationImage;

/*
    mutation updatePrecautionNotificationImage(
        $id:Int!,
        $imageName:String) {
            updatePrecautionNotificationImage(
                id:$id,
                imageName:$imageName) {
                    status
                    errorMessage
            }
    }
*/