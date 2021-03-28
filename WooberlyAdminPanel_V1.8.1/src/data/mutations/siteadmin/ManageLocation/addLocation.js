import { Location } from '../../../models'
import LocationType from '../../../types/siteadmin/LocationType';

import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const addLocation = {
    type: LocationType,

    args: {
        LocationName: { type: new NonNull(StringType) },
        coordinates: { type: new NonNull(StringType) },
        description: { type: new NonNull(StringType) },
    },

    async resolve({ request }, { LocationName, coordinates, description}) {
        let formattedCoordinates, geometryCoordinates;

        if (request.user && request.user.admin) {
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

            const addLocation = await Location.create({
                locationName: LocationName,
                coordinates,
                geometryCoordinates,
                description
            });

            if (addLocation) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400,
                    errorMessage: "Oops, something went wrong. Please try again."
                }
            }
        } else {
            return {
                status: 500,
                errorMessage: 'Please login with your account and continue.'
            }
        }
    }
}

export default addLocation;