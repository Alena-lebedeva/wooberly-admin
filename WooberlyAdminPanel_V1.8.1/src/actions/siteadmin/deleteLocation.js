import {
    DELETE_LOCATION_START,
    DELETE_LOCATION_ERROR,
    DELETE_LOCATION_SUCCESS
} from '../../constants';
import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

export function deleteLocation(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        let errorMessage;
        dispatch({
            type: DELETE_LOCATION_START
        });

        try {
            let query = gql `
            query getLocationList($currentPage: Int, $searchList: String){
                getLocationList(currentPage: $currentPage, searchList:$searchList){
                count
                LocationData{
                    id
                    locationName
                    description
                    isActive
                }
                }
            }
            `
            let mutation= gql `
            mutation deleteLocation($id: Int) {
                deleteLocation(id: $id) {
                  status
                  errorMessage
                }
              }
            `
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id
                },
                refetchQueries: [{ query, variables: { currentPage, searchList: '' } }]
            });



            if(data && data.deleteLocation && data.deleteLocation.status == 200) {
                dispatch({
                    type: DELETE_LOCATION_SUCCESS
                })
                toastr.success('Success!', 'The Location has been deleted successfully.')
            } else {
                errorMessage = data && data.deleteLocation && data.deleteLocation.errorMessage;
                errorMessage = errorMessage ? errorMessage : 'Something went wrong.';

                dispatch({
                    type: DELETE_LOCATION_ERROR
                })

                toastr.error('Error!', errorMessage)
            }

        } catch (err) {
            dispatch({
                type: DELETE_LOCATION_ERROR
            })
            toastr.error('Error!', 'Something went wrong.' + err)
        }
    }
}