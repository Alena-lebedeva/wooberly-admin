import gql from 'graphql-tag';
import histroy from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function updateLocation(LocationName, coordinates, id, description, isActive) {

  let coordinatesError ='';
  if(!coordinates || coordinates==''){
    toastr.error('Error!', 'Please select location');
    coordinatesError ='yes';
  }
  isActive = Number(isActive)
  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation updateLocation(
  				    $LocationName: String!,
              $coordinates: String!,
              $id: Int!,
              $description: String!,
              $isActive: Boolean!
            ) {
              updateLocation(
              LocationName: $LocationName
              coordinates: $coordinates,
              id: $id,
              description: $description,
              isActive: $isActive
            ){
              status
              errorMessage
            }
          }
        `;

    
    dispatch(setLoaderStart('updateLocation'));

    if(coordinatesError !=''){
      dispatch(setLoaderComplete('updateLocation'));
    }

    const { data } = await client.mutate({
      mutation,
      variables: {
        LocationName,
        coordinates,
        id,
        description,
        isActive
      },
      
    });
    
    dispatch(setLoaderComplete('updateLocation'));

    if (data && data.updateLocation && data.updateLocation.status === 200) {
      toastr.success('Success!', 'The Location has been updated successfully.');
      histroy.push('/siteadmin/location');
    } else if (data && data.updateLocation && data.updateLocation.status !== 200){
      toastr.error('Error!', data.updateLocation.errorMessage);
    } else {
      toastr.error('Error!', "Something went wrong. Please try again.");
    }
  }
}