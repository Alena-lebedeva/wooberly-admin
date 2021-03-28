import UserType from '../../types/siteadmin/UserType';
import { User, UserProfile } from '../../models'
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql'

const getRider = {
    type: UserType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await User.findOne({
                where: {
                    userType: 1
                },
                include: [
                    {
                        model: UserProfile,
                        as: 'profile',
                        required: true,
                        where: { profileId: id }
                    }
                ]
            })
        }
    }
}

export default getRider;

// GraphQL

// query getRider($id: Int!){
//     getRider( id: $id){
//       email
//       phoneNumber
//       password
//       userStatus
//       profile{
//         firstName
//         lastName
//       }
//     }
//   }