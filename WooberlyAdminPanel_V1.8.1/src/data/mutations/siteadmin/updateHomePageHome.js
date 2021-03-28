import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage, TempImages } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageHome = {

    type: HomePageType,

    args: {
        homeSectionImage1: { type: StringType },
        homeSectionImage2: { type: StringType },
        homeSectionImage3: { type: StringType },
        homeSectionImage4: { type: StringType },
        homeSectionImage5: { type: StringType },
        homeSectionImage6: { type: StringType },
        homeSectionImage7: { type: StringType },
        homeSectionImage8: { type: StringType },
        homeSectionButton1: { type: StringType },
        homeSectionTitle1: { type: StringType }
    },

    async resolve({ request }, {
        homeSectionImage1,
        homeSectionImage2,
        homeSectionImage3,
        homeSectionImage4,
        homeSectionImage5,
        homeSectionImage6,
        homeSectionImage7,
        homeSectionImage8,
        homeSectionButton1,
        homeSectionTitle1,
    }) {

        if (request.user && request.user.admin == true) {

            let isHomePageUpdated = false;

            const updateHomeImage1 = await HomePage.update({ value: homeSectionImage1 }, { where: { name: 'homeSectionImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage2 = await HomePage.update({ value: homeSectionImage2 }, { where: { name: 'homeSectionImage2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage3 = await HomePage.update({ value: homeSectionImage3 }, { where: { name: 'homeSectionImage3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage4 = await HomePage.update({ value: homeSectionImage4 }, { where: { name: 'homeSectionImage4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage5 = await HomePage.update({ value: homeSectionImage5 }, { where: { name: 'homeSectionImage5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage6 = await HomePage.update({ value: homeSectionImage6 }, { where: { name: 'homeSectionImage6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeImage7 = await HomePage.update({ value: homeSectionImage7 }, { where: { name: 'homeSectionImage7' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });
            const updateHomeImage8 = await HomePage.update({ value: homeSectionImage8 }, { where: { name: 'homeSectionImage8' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeButton1 = await HomePage.update({ value: homeSectionButton1 }, { where: { name: 'homeSectionButton1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            const updateHomeTitle1 = await HomePage.update({ value: homeSectionTitle1 }, { where: { name: 'homeSectionTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isHomePageUpdated = true;
                    } else {
                        isHomePageUpdated = false;
                    }
                });

            await TempImages.update({
                fileName: null
            }, {
                where: {
                    tableName: 'Homepage',
                    fieldName: {
                        or: [ 'homeSectionImage1', 'homeSectionImage2', 'homeSectionImage3',
                            'homeSectionImage4', 'homeSectionImage5', 'homeSectionImage6', 'homeSectionImage7', 'homeSectionImage8' ]
                    }
                }
            });

            if (isHomePageUpdated) {
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

export default updateHomePageHome;
/*
mutation updateHomePageHome (
    $homeSectionImage1: String
    $homeSectionImage2: String
    $homeSectionImage3: String
    $homeSectionImage4: String
    $homeSectionImage5: String
    $homeSectionImage6: String
    $homeSectionButton1: String
    $homeSectionTitle1: String
  ) {
    updateHomePageHome (
      homeSectionImage1: $homeSectionImage1
      homeSectionImage2: $homeSectionImage2
      homeSectionImage3: $homeSectionImage3
      homeSectionImage4: $homeSectionImage4
      homeSectionImage5: $homeSectionImage5
      homeSectionImage6: $homeSectionImage6
      homeSectionButton1: $homeSectionButton1
      homeSectionTitle1: $homeSectionTitle1
    ) {
      status
    }
  }
*/