import { Location, Pricing } from '../../../models'
import LocationType from '../../../types/siteadmin/LocationType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updateLocation = {

    type: LocationType,

    args: {
        LocationName: { type: new NonNull(StringType) },
        coordinates: { type: new NonNull(StringType) },
        id: { type: new NonNull(IntType) },
        description: { type: new NonNull(StringType) },
        isActive: { type: new NonNull(BooleanType) },
    },

    async resolve({ request }, { LocationName, coordinates, id, description, isActive}) {
        let formattedCoordinates, geometryCoordinates;

        if (request.user && request.user.admin) {

            if (!isActive) {
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
                        errorMessage: "Sorry, unable to inactive. The chosen location is used on the manage fare. Please remove the fare and try again."
                    }
                }
            }

            formattedCoordinates = coordinates.replace(/[{}/[\]\\]/g, '');
            formattedCoordinates = formattedCoordinates.replace('"lat":', '[');
            formattedCoordinates = formattedCoordinates.replace(/,"lat":/gi, '], [');
            formattedCoordinates = formattedCoordinates.replace(/,"lng":/gi, ', ');
            formattedCoordinates = '[' + formattedCoordinates + ']]';
            formattedCoordinates = JSON.parse(formattedCoordinates);
            formattedCoordinates.push(formattedCoordinates[0]); // First item should be added again to the last item(So MySQL polygon draw completes)

            geometryCoordinates = {
                type: 'Polygon', 
                coordinates: [formattedCoordinates]
            };

            let update = await Location.update({
                locationName: LocationName,
                coordinates,
                geometryCoordinates,
                description,
                isActive
            },
                {
                    where: {
                        id
                    }
                }
            );

            return {
                status: 200
            }
           
        } else {
            return {
                status: 500,
                errorMessage: 'Please login with your account and continue.'
            }
        }
    }
}

export default updateLocation;