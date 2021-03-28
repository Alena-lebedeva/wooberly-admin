import UserType from '../../types/siteadmin/UserType';
import { User, UserProfile } from '../../models'
import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql'

const getDriver = {
    type: UserType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await User.findOne({
                where: {
                    userType: 2
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

export default getDriver;

//GraphQL 

// query getDriver($id: Int!){
//     getDriver( id: $id){
//       email
//       phoneNumber
//       password
//       profile{
//         firstName
//         lastName
//         licenceFront
//         licenceBack
//       }
//     }
//   }