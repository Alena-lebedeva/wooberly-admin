import gql from 'graphql-tag';
import history from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';


export function editRider(values) {
  return async (dispatch, getState, { client }) => {
    let errorMessage = 'Oops! something went wrong. Try again!';
    const mutation = gql`
        
        mutation updateRider(
            $id: ID,
            $firstName: String,
            $lastName: String,
            $email: String,
            $password: String,
            $phoneDialCode: String
            $phoneNumber: String,
              $userStatus: String,
              $isBan: Int
              $phoneCountryCode: String
            ) {
            updateRider(
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
        query getAllRiders($currentPage: Int){
            getAllRiders(currentPage: $currentPage){
             count
              userData{
                email
                  phoneNumber
                  userStatus
                  isBan
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

    dispatch(setLoaderStart('EditRider'));

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

    dispatch(setLoaderComplete('EditRider'));

    if (data && data.updateRider && data.updateRider.status === 200) {
      history.push('/siteadmin/riders')
      toastr.success('Success', 'Rider has been updated!')
    } else {
      errorMessage = (data && data.updateRider && data.updateRider.errorMessage) ? data.updateRider.errorMessage : errorMessage;
      toastr.error("Error!", errorMessage);
    }
  }
}