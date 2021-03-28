import HomePageType from '../../types/siteadmin/HomePageType'
import { HomePage } from '../../models'

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateHomePageFooter = {

    type: HomePageType,

    args: {
        footerLogo1: { type: StringType },
        footerLogo2: { type: StringType },
        footerLogo3: { type: StringType },
        footerLogo4: { type: StringType },
        footerTitle1: { type: StringType },
        footerContent1: { type: StringType },
        footerLink1: { type: StringType },
        footerLink2: { type: StringType },
        footerLink3: { type: StringType },
        footerLink4: { type: StringType },
        footerLinkName1: { type: StringType },
        footerLinkName2: { type: StringType },
        footerLinkName3: { type: StringType },
        footerLinkName4: { type: StringType },
        footerLinkTitle: { type: StringType },
        footerBottom: { type: StringType },
    },

    async resolve({ request }, {
        footerLogo1,
        footerLogo2,
        footerLogo3,
        footerLogo4,
        footerTitle1,
        footerContent1,
        footerLink1,
        footerLink2,
        footerLink3,
        footerLink4,
        footerLinkName1,
        footerLinkName2,
        footerLinkName3,
        footerLinkName4,
        footerLinkTitle,
        footerBottom
    }) {
    

        if (request.user && request.user.admin == true) {
            
            let isFooterPageUpdated = false;

            const updateFooterLogo1 = await HomePage.update({ value: footerLogo1 }, { where: { name: 'footerLogo1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLogo2 = await HomePage.update({ value: footerLogo2 }, { where: { name: 'footerLogo2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLogo3 = await HomePage.update({ value: footerLogo3 }, { where: { name: 'footerLogo3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLogo4 = await HomePage.update({ value: footerLogo4 }, { where: { name: 'footerLogo4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterTitle1 = await HomePage.update({ value: footerTitle1 }, { where: { name: 'footerTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterContent1 = await HomePage.update({ value: footerContent1 }, { where: { name: 'footerContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLink1 = await HomePage.update({ value: footerLink1 }, { where: { name: 'footerLink1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterLinkName1 = await HomePage.update({ value: footerLinkName1 }, { where: { name: 'footerLinkName1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLink2 = await HomePage.update({ value: footerLink2 }, { where: { name: 'footerLink2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterLinkName2 = await HomePage.update({ value: footerLinkName2 }, { where: { name: 'footerLinkName2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLink3 = await HomePage.update({ value: footerLink3 }, { where: { name: 'footerLink3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterLinkName3 = await HomePage.update({ value: footerLinkName3 }, { where: { name: 'footerLinkName3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });
                
            const updateFooterLink4 = await HomePage.update({ value: footerLink4 }, { where: { name: 'footerLink4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterLinkName4 = await HomePage.update({ value: footerLinkName4 }, { where: { name: 'footerLinkName4' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterLinkTitle = await HomePage.update({ value: footerLinkTitle }, { where: { name: 'footerLinkTitle' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            const updateFooterBottom = await HomePage.update({ value: footerBottom }, { where: { name: 'footerBottom' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isFooterPageUpdated = true;
                    } else {
                        isFooterPageUpdated = false;
                    }
                });

            
            if(isFooterPageUpdated) {
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

export default updateHomePageFooter;

/*
mutation updateHomePageFooter (
  $footerLogo1: String
  $footerLogo2: String
  $footerLogo3: String
  $footerLogo4: String
  $footerTitle1: String
  $footerContent1: String
  $footerLink1: String
  $footerLink2: String
  $footerLink3: String
  $footerLink4: String
  $footerLinkName1: String
  $footerLinkName2: String
  $footerLinkName3: String
  $footerLinkName4: String
  $footerLinkTitle: String
  $footerBottom: String
) {
  updateHomePageFooter (
    footerLogo1: $footerLogo1
    footerLogo2: $footerLogo2
    footerLogo3: $footerLogo3
    footerLogo4: $footerLogo4
    footerTitle1: $footerTitle1
    footerContent1: $footerContent1
    footerLink1: $footerLink1
    footerLink2: $footerLink2
    footerLink3: $footerLink3
    footerLink4: $footerLink4
    footerLinkName1: $footerLinkName1
    footerLinkName2: $footerLinkName2
    footerLinkName3: $footerLinkName3
    footerLinkName4: $footerLinkName4
    footerLinkTitle: $footerLinkTitle
    footerBottom: $footerBottom
  ) {
    status
  }
}
*/