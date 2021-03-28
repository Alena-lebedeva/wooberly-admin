import UserType from '../../types/siteadmin/UserType';
import { User, UserProfile, Country, Booking } from '../../models';

import {
    GraphQLString as StringType,
    GraphQLID as ID,
    GraphQLInt as IntType
} from 'graphql';

const updateRider = {
    type: UserType,

    args: {
        id: { type: ID },
        firstName: { type: StringType },
        lastName: { type: StringType },
        email: { type: StringType },
        password: { type: StringType },
        phoneDialCode: { type: StringType },
        phoneNumber: { type: StringType },
        userStatus: { type: StringType },
        isBan: { type: IntType },
        phoneCountryCode: { type: StringType },
    },

    async resolve({ request }, { 
        id, firstName, lastName, email, password, 
        phoneDialCode, phoneNumber, userStatus, isBan, phoneCountryCode }) {
        if (request.user && request.user.admin) {
            const checkUserExist = await User.find({
                attributes: ['email', 'phoneNumber', 'phoneCountryCode'],
                where: {
                    or: [{
                        email
                    }, {
                        phoneNumber,
                        phoneCountryCode,
                        phoneDialCode
                    }],
                    id: {
                        ne: id
                    },
                    deletedAt: null
                },
                raw: true
            });

            if (checkUserExist) {
                if (checkUserExist && checkUserExist.email === email) {
                    return {
                        status: 400,
                        errorMessage: 'Oops, the provided email is already exits with the other user.'
                    };
                } else {
                    return {
                        status: 400,
                        errorMessage: 'Oops, the provided phone number is already exits with the other user.'
                    };
                }
            }
            const riderStatus = await Booking.findOne({
                attributes: ['tripStatus'],
                where: {
                    riderId: id
                },
                raw: true
            });
            
            if (riderStatus && riderStatus.tripStatus == "approved" || riderStatus && riderStatus.tripStatus == "created" || riderStatus && riderStatus.tripStatus == "started") {
                return {
                    status: 400,
                    errorMessage: "Can't Change the status as currently, they are on a ride, Please try again later"
                }
            }

            const updateUser = await User.update({
                email,
                phoneDialCode,
                phoneNumber,
                userStatus,
                isBan,
                phoneCountryCode
            }, {
                where: {
                    id
                }
            });

            if(password && password.toString().trim() != '') {
                const updateUserPassword = await User.update({
                    password: User.prototype.generateHash(password)    
                }, {
                    where: {
                        id
                    }
                });
            }
            
            if (updateUser) {
                let getCountry;
                if(phoneCountryCode.length > 2){
                     getCountry = await Country.findOne({
                        attributes: ['countryName'],
                        where: { countryName: phoneCountryCode },
                        raw: true
                    });
                } else {
                     getCountry = await Country.findOne({
                        attributes: ['countryName'],
                        where: { countryCode: phoneCountryCode },
                        raw: true
                    });
                }
                
                const updateUserProfile = await UserProfile.update({
                        firstName,
                        lastName,
                        country: getCountry && getCountry.countryName  
                },  {
                    where: {
                        userId: id
                    }
                });
                
                return await {
                    status: 200
                };
            } else {
                return {
                    status: 400,
                    errorMessage: 'Oops! Something went wrong, unable to update the user information.'
                };
            }
        } else {
            return {
                status: 500,
                errorMessage: 'Oops! Please login as an admin and continue the action'
            };
        }
    }
}

export default updateRider;

//GraphQL


// mutation updateRider(
//     $id: ID,
//     $firstName: String,
//     $lastName: String,
//     $email: String,
//     $password: String,
//     $phoneNumber: String,

//     ) {
//     updateRider(
//       id: $id
//       firstName: $firstName
//       lastName: $lastName
//       email:$email
//       password: $password
//       phoneNumber: $phoneNumber

//     )
//     {
//       status
//     }
//   }


// {
//     "id": "1c480030-0f5c-11ea-a0d1-e52d223bb23c",
//     "firstName": "Syed",
//     "lastName": "Radical",
//     "email": "sg@radical.com",
//     "phoneNumber": "9090909090",
//     "password": "qwerty123"
//   }