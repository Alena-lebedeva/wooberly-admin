import gql from 'graphql-tag';
import history from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function editVehicle(id, vehicleName, vehicleType, vehicleNumber, vehicleStatus) {
    
    return async (dispatch, getState, { client }) => {
        const mutation = gql`
            mutation updateVehicle($id: Int, $vehicleName: String, $vehicleType: Int, $vehicleNumber: String, $vehicleStatus: String) {
                updateVehicle(
                id: $id
                vehicleName: $vehicleName,
                vehicleType: $vehicleType
                vehicleNumber: $vehicleNumber,
                vehicleStatus: $vehicleStatus
                ){
                status
                }
            }
        `;

        const query = gql`
            query getAllVehicles($currentPage: Int){
                getAllVehicles(currentPage: $currentPage){
                count
                vehicleData{
                    id
                    vehicleType
                    vehicleNumber
                    vehicleName 
                    vehicleStatus
                    category{
                        categoryName
                    }
                    user{
                        email
                        profile{
                        firstName
                        }
                    }
                }
                }
            }
        `;
        dispatch(setLoaderStart('EditVehicle'));

        const { data } = await client.mutate({
            mutation,
            variables: {
                id,
                vehicleName,
                vehicleType,
                vehicleNumber,
                vehicleStatus
            },
            refetchQueries: [{
                query,
                variables: {
                    currentPage: 1
                }
            }]
        })
        dispatch(setLoaderComplete('EditVehicle'));

        if (data && data.updateVehicle && data.updateVehicle.status === 200) {
            history.push('/siteadmin/vehicles')
            toastr.success('Success', 'Vehicle has been updated!')
        } else if(data && data.updateVehicle && data.updateVehicle.status === 400) {
            history.push('/siteadmin/vehicles');
            toastr.error('Failed', "Can't Change the status as currently, they are on a trip, Please try again later" );
        } else {
            history.push('/siteadmin/vehicles');
            toastr.error('Failed', "Something went wrong");
        }
    }
}