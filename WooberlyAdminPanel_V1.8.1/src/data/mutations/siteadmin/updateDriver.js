import UserType from '../../types/siteadmin/UserType';
import { User, UserProfile, Country, Booking } from '../../models';

import {
    GraphQLString as StringType,
    GraphQLID as ID,
    GraphQLInt as IntType
} from 'graphql';

const updateDriver = {
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
        licenceFront: { type: StringType },
        licenceBack: { type: StringType },
        phoneCountryCode: { type: StringType }
    },

    async resolve({ request }, { 
        id, firstName, lastName, email, password, 
        phoneDialCode, phoneNumber, userStatus, isBan, licenceFront,
        licenceBack, phoneCountryCode }) {

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

            const driverStatus = await Booking.findOne({
                attributes: ['tripStatus'],
                where: {
                    driverId: id
                },
                raw: true
            });
            
            if (driverStatus && driverStatus.tripStatus == "approved" || driverStatus && driverStatus.tripStatus == "created" || driverStatus && driverStatus.tripStatus == "started") {
                return {
                    status: 400,
                    errorMessage: "Can't Change the status as currently, they are on a trip, Please try again later"
                }
            }

            let country;
                if(phoneCountryCode.length > 2){
                     country = await Country.findOne({
                        attributes: ['countryName'],
                        where: { countryName: phoneCountryCode },
                        raw: true
                    });
                } else {
                     country = await Country.findOne({
                        attributes: ['countryName'],
                        where: { countryCode: phoneCountryCode },
                        raw: true
                    });
                }
            

            const updateUser = await User.update({
                email,
                phoneDialCode,
                phoneNumber,
                phoneCountryCode,
                userStatus,
                isBan,
                licenceFront,
                licenceBack
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

            if (userStatus && userStatus !== 'active') {
                const updateUserActiveStatus = await User.update({
                    isActive: false   
                }, {
                    where: {
                        id
                    }
                }); 
            }

            if (updateUser) {
                const updateUserProfile = await UserProfile.update({
                    firstName,
                    lastName,
                    country: country && country.countryName
                }, {
                    where: {
                        userId: id
                    }
                });

                return await {
                    status: 200
                };
            } else {
                return {
                    errorMessage: 'Oops! Something went wrong, unable to update the user information.'
                };
            }
        } else {
            return {
                errorMessage: 'Please login as an admin and continue the action.'
            };
        }
    }
}

export default updateDriver;

//GraphQL

// mutation updateDriver(
//     $id: ID,
//     $firstName: String,
//     $lastName: String,
//     $email: String,
//     $password: String,
//     $phoneNumber: String,
// 		$userStatus: String
//     ) {
//     updateDriver(
//       id: $id
//       firstName: $firstName
//       lastName: $lastName
//       email:$email
//       password: $password
//       phoneNumber: $phoneNumber
// 			userStatus: $userStatus
//     )
//     {
//       status
//     }
//   }


// {
//     "id": "e061c360-0f5d-11ea-a0d1-e52d223bb23c",
//     "firstName": "Syed",
//     "lastName": "Radical",
//     "email": "sg@radical.com",
//     "phoneNumber": "9090909090",
//     "password": "qwerty123",
//     "userStatus": "active"
//   }