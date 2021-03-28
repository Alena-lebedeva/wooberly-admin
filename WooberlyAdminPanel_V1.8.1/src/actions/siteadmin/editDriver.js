import gql from 'graphql-tag';
import history from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function editDriver(values) {

  return async (dispatch, getState, { client }) => {
    let errorMessage = 'Oops! something went wrong. Try again!';

    const mutation = gql`
        
        mutation updateDriver(
            $id: ID,
            $firstName: String,
            $lastName: String,
            $email: String,
            $password: String,
            $phoneDialCode: String
            $phoneNumber: String,
            $userStatus: String,
            $isBan: Int,
            $phoneCountryCode: String
           
            ) {
            updateDriver(
              id: $id
              firstName: $firstName
              lastName: $lastName
              email:$email
              password: $password
              phoneDialCode: $phoneDialCode
              phoneNumber: $phoneNumber
              userStatus: $userStatus
              isBan: $isBan
              phoneCountryCode: $phoneCountryCode
            )
            {
              status
              errorMessage
            }
          }
        `;
    const query = gql`
        query getAllDriver($currentPage: Int){
            getAllDrivers(currentPage: $currentPage){
             count
              userData{
                email
                  phoneNumber
                    createdAt
                    profile{
                      profileId
                      firstName
                      lastName
                      country
                    }
              }
            }
          }
        `;
    
    dispatch(setLoaderStart('EditDriver'));

    const { data } = await client.mutate({
      mutation,
      variables: {
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneDialCode: values.phoneDialCode,
        phoneNumber: values.phoneNumber,
        userStatus: values.userStatus,
        isBan: values.isBan,
        phoneCountryCode: values.phoneCountryCode
      },
      refetchQueries: [{
        query,
        variables: {
          currentPage: 1
        }
      }]
    });

    dispatch(setLoaderComplete('EditDriver'));
    
    if (data && data.updateDriver && data.updateDriver.status === 200) {
      history.push('/siteadmin/drivers')
      toastr.success('Success!', 'Driver has been updated!')
    } else {
      errorMessage = (data && data.updateDriver && data.updateDriver.errorMessage) ? data.updateDriver.errorMessage : errorMessage;
      toastr.error("Error!", errorMessage);
    }
  }
}