import { UserProfile } from '../../models';
import UserProfileType from '../../types/siteadmin/UserProfileType';

import {
    GraphQLString as StringType,
    GraphQLID as ID
} from 'graphql'

const UploadDriverPhotos = {
    type: UserProfileType,

    args: {
        id: { type: ID },
        picture: { type: StringType },
        licenceFront: { type: StringType },
        licenceBack: { type: StringType }
    },

    async resolve({ request }, { id, picture, licenceFront, licenceBack }) {
        if (request.user && request.user.admin) {
            const upload = await UserProfile.update({
                picture,
                licenceFront,
                licenceBack
            }, {
                    where: {
                        userId: id
                    }
                }
            )
            if (upload) {
                return {
                    uploadStatus: 'Image Uploaded Succesfully'
                }
            } else {
                return {
                    errorMessage: 'Something went wrong'
                }
            }

        } else {
            return {
                errorMessage: 'Please Login'
            }
        }
    }
}

export default UploadDriverPhotos;