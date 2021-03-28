import gql from 'graphql-tag';
import histroy from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function addLocation(LocationName, coordinates, description) {

let coordinatesError ='';
if(!coordinates || coordinates==''){
  toastr.error('Error!', 'Please select location');
  coordinatesError ='yes';
}

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation addLocation(
  				    $LocationName: String!,
              $coordinates: String!,
              $description: String!
            ) {
            addLocation(
              LocationName: $LocationName
              coordinates: $coordinates
              description: $description
            ){
              status
              errorMessage
            }
          }
        `;

    
    dispatch(setLoaderStart('AddLocation'));
    
    if(coordinatesError !=''){
      dispatch(setLoaderComplete('AddLocation'));
    }


    const { data } = await client.mutate({
      mutation,
      variables: {
        LocationName,
        coordinates,
        description
      },
      
    });
    
    dispatch(setLoaderComplete('AddLocation'));
    
    if (data && data.addLocation && data.addLocation.status === 200) {
      toastr.success('Success!', 'The Location has been added successfully.');
      histroy.push('/siteadmin/location');
    } else if (data && data.addLocation && data.addLocation.status !== 200){
      toastr.error('Error!', data.addLocation.errorMessage);
    } else {
      toastr.error('Error!', "Something went wrong. Please try again.");
    }
  }
}