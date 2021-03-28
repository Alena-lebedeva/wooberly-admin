import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage,TempImages } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageAbout = {

    type: HomePageType,

    args: {
        aboutGridImage1: { type: StringType },
        aboutGridImage2: { type: StringType },
        aboutGridTitle1: { type: StringType },
        aboutGridTitle2: { type: StringType },
        aboutGridTitle3: { type: StringType },
        aboutGridTitle4: { type: StringType },
        aboutGridTitle5: { type: StringType },
        aboutGridTitle6: { type: StringType },
        aboutGridContent1: { type: StringType },
        aboutGridContent2: { type: StringType },
        aboutGridContent3: { type: StringType },
        aboutGridContent4: { type: StringType },
        aboutGridContent5: { type: StringType },
        aboutGridContent6: { type: StringType },
    },

    async resolve({ request }, {
        aboutGridImage1,
        aboutGridImage2,
        aboutGridTitle1,
        aboutGridTitle2,
        aboutGridTitle3,
        aboutGridTitle4,
        aboutGridTitle5,
        aboutGridTitle6,
        aboutGridContent1,
        aboutGridContent2,
        aboutGridContent3,
        aboutGridContent4,
        aboutGridContent5,
        aboutGridContent6
    }) {

        if (request.user && request.user.admin == true) {
            let isAboutPageUpdated = false;

            const updateAboutGridImage1 = await HomePage.update({ value: aboutGridImage1 }, { where: { name: 'aboutGridImage1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridImage2 = await HomePage.update({ value: aboutGridImage2 }, { where: { name: 'aboutGridImage2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle1 = await HomePage.update({ value: aboutGridTitle1 }, { where: { name: 'aboutGridTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle2 = await HomePage.update({ value: aboutGridTitle2 }, { where: { name: 'aboutGridTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle3 = await HomePage.update({ value: aboutGridTitle3 }, { where: { name: 'aboutGridTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle4 = await HomePage.update({ value: aboutGridTitle4 }, { where: { name: 'aboutGridTitle4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle5 = await HomePage.update({ value: aboutGridTitle5 }, { where: { name: 'aboutGridTitle5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridTitle6 = await HomePage.update({ value: aboutGridTitle6 }, { where: { name: 'aboutGridTitle6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent1 = await HomePage.update({ value: aboutGridContent1 }, { where: { name: 'aboutGridContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent2 = await HomePage.update({ value: aboutGridContent2 }, { where: { name: 'aboutGridContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent3 = await HomePage.update({ value: aboutGridContent3 }, { where: { name: 'aboutGridContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent4 = await HomePage.update({ value: aboutGridContent4 }, { where: { name: 'aboutGridContent4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent5 = await HomePage.update({ value: aboutGridContent5 }, { where: { name: 'aboutGridContent5' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            const updateAboutGridContent6 = await HomePage.update({ value: aboutGridContent6 }, { where: { name: 'aboutGridContent6' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isAboutPageUpdated = true;
                    } else {
                        isAboutPageUpdated = false;
                    }
                });

            await TempImages.update({
                fileName: null
            }, {
                where: {
                    tableName: 'Homepage',
                    fieldName: { or: [ 'aboutGridImage1', 'aboutGridImage2'] }
                }
            });

            if (isAboutPageUpdated) {
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

export default updateHomePageAbout;
/*
mutation updateHomePageAbout (
  $aboutGridImage1: String
  $aboutGridImage2: String
  $aboutGridTitle1: String
  $aboutGridTitle2: String
  $aboutGridTitle3: String
  $aboutGridTitle4: String
  $aboutGridTitle5: String
  $aboutGridTitle6: String
  $aboutGridContent1: String
  $aboutGridContent2: String
  $aboutGridContent3: String
  $aboutGridContent4: String
  $aboutGridContent5: String
  $aboutGridContent6: String
) {
  updateHomePageAbout (
    aboutGridImage1: $aboutGridImage1
    aboutGridImage2: $aboutGridImage2
    aboutGridTitle1: $aboutGridTitle1
    aboutGridTitle2: $aboutGridTitle2
    aboutGridTitle3: $aboutGridTitle3
    aboutGridTitle4: $aboutGridTitle4
    aboutGridTitle5: $aboutGridTitle5
    aboutGridTitle6: $aboutGridTitle6
    aboutGridContent1: $aboutGridContent1
    aboutGridContent2: $aboutGridContent2
    aboutGridContent3: $aboutGridContent3
    aboutGridContent4: $aboutGridContent4
    aboutGridContent5: $aboutGridContent5
    aboutGridContent6: $aboutGridContent6

  ) {
    status
  }
}
*/