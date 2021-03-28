import { User, UserProfile, Booking } from '../../models';
import UserProfileType from '../../types/siteadmin/UserProfileType';
import {
    GraphQLInt as IntType
} from 'graphql';

const deleteUser = {
    type: UserProfileType,

    args: {
        profileId: { type:  IntType }
    },

    async resolve({request}, { profileId }) {
        if (request.user && request.user.admin) {
            
            const findUser =  await UserProfile.findOne({
                attributes: ['userId'],
                where: {
                    profileId
                },
                raw: true
            });

            const userId = findUser && findUser.userId;
            
            const booking = await Booking.findOne({
                attributes: ['id'],
                where: {
                    and: [
                        { or: [{ driverId: userId }, { riderId: userId }] },
                        { or: [{ tripStatus: 'created' }, { tripStatus: 'approved' }, { tripStatus: 'started' }] }
                    ]
                }
            });
            
            if(!booking) {
                const deletedUser = await User.update({
                        deletedAt: new Date()
                    }, {
                        where: {
                            id: userId
                        }
                    });
    
                if (deletedUser) {
                    return await {
                        status: 200
                    }
                } else {
                    return await {
                        status: 400,
                        errorMessage: "Something went wrong! Please try again."
                    }
                }
            } else {
                return await {
                    status: 400,
                    errorMessage: "Oops! it looks like the user has a booking and unable to delete them."
                }
            }  
        } else {
            return {
                status: 500
            }
        }
    }
};

export default deleteUser;