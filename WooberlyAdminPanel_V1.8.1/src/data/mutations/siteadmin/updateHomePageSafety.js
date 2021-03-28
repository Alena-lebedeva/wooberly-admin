import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage, TempImages } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageSafety = {

    type: HomePageType,

    args: {
        safetyGridImage1: { type: StringType },
        safetyGridImage2: { type: StringType },
        safetyGridImage3: { type: StringType },
        safetyGridTitle1: { type: StringType },
        safetyGridContent1: { type: StringType },
        safetyGridLink1: { type: StringType },
        safetyGridLink2: { type: StringType }
    },

    async resolve({ request }, {
        safetyGridImage1,
        safetyGridImage2,
        safetyGridImage3,
        safetyGridTitle1,
        safetyGridContent1,
        safetyGridLink1,
        safetyGridLink2
    }) {

        if (request.user && request.user.admin == true) {

            let isSafetyGridUpdated = false;

            const updateSafetyGridImage1 = await HomePage.update({ value: safetyGridImage1 }, { where: { name: 'safetyGridImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridImage2 = await HomePage.update({ value: safetyGridImage2 }, { where: { name: 'safetyGridImage2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridImage3 = await HomePage.update({ value: safetyGridImage3 }, { where: { name: 'safetyGridImage3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridTitle1 = await HomePage.update({ value: safetyGridTitle1 }, { where: { name: 'safetyGridTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridContent1 = await HomePage.update({ value: safetyGridContent1 }, { where: { name: 'safetyGridContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridLink1 = await HomePage.update({ value: safetyGridLink1 }, { where: { name: 'safetyGridLink1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            const updateSafetyGridLink2 = await HomePage.update({ value: safetyGridLink2 }, { where: { name: 'safetyGridLink2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isSafetyGridUpdated = true;
                    } else {
                        isSafetyGridUpdated = false;
                    }
                });

            await TempImages.update({
                fileName: null
            }, {
                where: {
                    tableName: 'Homepage',
                    fieldName: { or: ['safetyGridImage1', 'safetyGridImage2', 'safetyGridImage3'] }
                }
            });

            if (isSafetyGridUpdated) {
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

export default updateHomePageSafety;

/*
mutation updateHomePageSafety (
  $safetyGridImage1: String
  $safetyGridImage2: String
  $safetyGridImage3: String
  $safetyGridTitle1: String
  $safetyGridContent1: String
  $safetyGridLink1: String
  $safetyGridLink2: String
) {
  updateHomePageSafety (
    safetyGridImage1: $safetyGridImage1
    safetyGridImage2: $safetyGridImage2
    safetyGridImage3: $safetyGridImage3
    safetyGridTitle1: $safetyGridTitle1
    safetyGridContent1: $safetyGridContent1
    safetyGridLink1: $safetyGridLink1
    safetyGridLink2: $safetyGridLink2
  ) {
    status
  }
}
*/