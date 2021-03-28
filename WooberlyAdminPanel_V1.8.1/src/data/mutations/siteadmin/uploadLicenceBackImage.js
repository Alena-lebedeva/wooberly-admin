import {
    GraphQLString as StringType,
    GraphQLID as ID
} from 'graphql'
import UserProfileType from '../../types/siteadmin/UserProfileType'
import { UserProfile } from '../../models/index'

const uploadLicenceBackImage = {

    type: UserProfileType,

    args: {
        userId: { type: ID },
        licenceBack: { type: StringType },
    },

    async resolve({ request }, { userId, licenceBack }) {

        if (request.user && request.user.admin) {
            let userProfile = await UserProfile.update({
                licenceBack
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

export default uploadLicenceBackImage;