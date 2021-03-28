import { Location, Pricing } from '../../../models'
import LocationType from '../../../types/siteadmin/LocationType';

import {
    GraphQLInt as IntType
} from 'graphql';

const deleteLocation = {
    type: LocationType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {

        if (request.user && request.user.admin) {
            const isFareUsed = await Pricing.findOne({
                attributes: ['id'],
                where: {
                    isActive: true,
                    locationId: id
                }
            });

            if (isFareUsed) {
                return await {
                    status: 400,
                    errorMessage: "Sorry, unable to delete. The chosen location is used on the manage fare. Please remove the fare and try again."
                }
            }

            const deleteLocation = await Location.destroy({
                where: {
                    id
                }
            });

            if (deleteLocation) {
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
                status: 500,
            }
        }
    }
}

export default deleteLocation;

/*
mutation deleteLocation($id: Int) {
                deleteLocation(id: $id) {
                  status
                }
              }
*/