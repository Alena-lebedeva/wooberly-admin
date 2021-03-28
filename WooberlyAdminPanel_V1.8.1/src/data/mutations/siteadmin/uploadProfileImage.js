import {
    GraphQLString as StringType,
    GraphQLID as ID
} from 'graphql'
import UserProfileType from '../../types/siteadmin/UserProfileType'
import { UserProfile } from '../../models/index'

const uploadProfileImage = {

    type: UserProfileType,

    args: {
        userId: { type: ID },
        picture: { type: StringType }
    },

    async resolve({ request }, { userId, picture }) {

        if (request.user && request.user.admin) {
            let userProfile = await UserProfile.update({
                picture
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

export default uploadProfileImage;