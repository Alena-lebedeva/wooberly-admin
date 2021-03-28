// Models
import { PrecautionNotification } from "../../../models";

//Types
import PrecautionNotificationCommonType from "../../../types/siteadmin/PrecautionNotification/PrecautionNotificationCommonType";

const getAllPrecautionNotification = {

    type: PrecautionNotificationCommonType,

    async resolve({ request, response }) {
        try {
            if (request.user && request.user.admin) {
                const results = await PrecautionNotification.findAll({});
                return await {
                    status: !results || results.length <= 0 ? 400 : 200,
                    errorMessage: !results || results.length <= 0 ? 'No record found' : null,
                    results
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

export default getAllPrecautionNotification;

/*
    query GetAllPrecautionNotification {
        getAllPrecautionNotification { 
            status
            errorMessage
            results {
                id
                title
                description
                isEnabled
                imageName
            }
        }
    }
*/