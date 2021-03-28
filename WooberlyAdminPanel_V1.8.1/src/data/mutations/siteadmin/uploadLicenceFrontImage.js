import {
    GraphQLString as StringType,
    GraphQLID as ID
} from 'graphql'
import UserProfileType from '../../types/siteadmin/UserProfileType'
import { UserProfile } from '../../models/index'

const uploadLicenceFrontImage = {

    type: UserProfileType,

    args: {
        userId: { type: ID },
        licenceFront: { type: StringType },
    },

    async resolve({ request }, { userId, licenceFront }) {

        if (request.user && request.user.admin) {
            let userProfile = await UserProfile.update({
                licenceFront
            }, {
                where: {
                    userId
                }
            })
        
            if (userProfile) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }
        } else {
            return {
                status: 403
            }
        }
    }
}

export default uploadLicenceFrontImage;