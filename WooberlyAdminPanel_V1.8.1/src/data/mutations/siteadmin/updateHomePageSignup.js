import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage, TempImages } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageSignup = {

    type: HomePageType,

    args: {
        signupGridImage1: { type: StringType },
        signupGridImage2: { type: StringType },
        signupGridImage3: { type: StringType },
        signupGridTitle1: { type: StringType },
        signupGridContent1: { type: StringType },
        signupGridLink1: { type: StringType },
        signupGridLink2: { type: StringType },
    },

    async resolve({ request }, {
        signupGridImage1,
        signupGridImage2,
        signupGridImage3,
        signupGridTitle1,
        signupGridContent1,
        signupGridLink1,
        signupGridLink2
    }) {

        if (request.user && request.user.admin == true) {

            let isSignupPageUpdated = false;

            const updateSignupGridImage1 = await HomePage.update({ value: signupGridImage1 }, { where: { name: 'signupGridImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridImage2 = await HomePage.update({ value: signupGridImage2 }, { where: { name: 'signupGridImage2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridImage3 = await HomePage.update({ value: signupGridImage3 }, { where: { name: 'signupGridImage3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridTitle1 = await HomePage.update({ value: signupGridTitle1 }, { where: { name: 'signupGridTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridContent1 = await HomePage.update({ value: signupGridContent1 }, { where: { name: 'signupGridContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridLink1 = await HomePage.update({ value: signupGridLink1 }, { where: { name: 'signupGridLink1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            const updateSignupGridLink2 = await HomePage.update({ value: signupGridLink2 }, { where: { name: 'signupGridLink2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSignupPageUpdated = true;
                    } else {
                        isSignupPageUpdated = false;
                    }
                });

            await TempImages.update({
                fileName: null
            }, {
                where: {
                    tableName: 'Homepage',
                    fieldName: { or: ['signupGridImage1', 'signupGridImage2', 'signupGridImage3'] }
                }
            });

            if (isSignupPageUpdated) {
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
                status: 400
            }
        }
    }
}

export default updateHomePageSignup;

/*
mutation updateHomePageSignup (
  $signupGridImage1: String
  $signupGridImage2: String
  $signupGridImage3: String
  $signupGridTitle1: String
  $signupGridContent1: String
  $signupGridLink1: String
  $signupGridLink2: String
) {
  updateHomePageSignup (
    signupGridImage1: $signupGridImage1
    signupGridImage2: $signupGridImage2
    signupGridImage3: $signupGridImage3
    signupGridTitle1: $signupGridTitle1
    signupGridContent1: $signupGridContent1
    signupGridLink1: $signupGridLink1
    signupGridLink2: $signupGridLink2
  ) {
    status
  }
}
*/