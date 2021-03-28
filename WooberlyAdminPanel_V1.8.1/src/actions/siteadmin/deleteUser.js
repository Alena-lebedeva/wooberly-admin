import gql from 'graphql-tag';
import {
    USER_DELETE_SUCCESS,
    USER_DELETE_START,
    USER_DELETE_ERROR
} from '../../constants/index';
import { toastr } from 'react-redux-toastr';

export default function deleteUser(profileId, currentPage, userType) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: USER_DELETE_START,
            payload: {
                deleteLoading: true
            }
        });
        
        try {
            let query, errorMessage;

            if (userType === 2) {
                query = gql`
                query getAllDrivers($currentPage: Int){
                    getAllDrivers(currentPage: $currentPage){
                      count
                      userData {
                        email
                        phoneDialCode
                        phoneNumber
                        isBan
                        userStatus
                        createdAt
                        profile {
                          profileId
                          firstName
                          lastName
                          country
                        }
                      }   
                    }
                  }
                `;
            } else {
                query = gql`
                query getAllRiders($currentPage: Int){
                    getAllRiders(currentPage: $currentPage){
                     count
                      userData {
                        email
                        phoneDialCode
                        phoneNumber
                        isBan
                        userStatus
                        createdAt
                        profile {
                          profileId
                          firstName
                          lastName
                          country
                        }
                      }
                    }
                  }
                `;
            }
            

            let mutation = gql`
            mutation deleteUser($profileId: Int) {
                deleteUser(profileId: $profileId) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables : {
                    profileId
                },
                refetchQueries: [{ query, variables: { currentPage } }]
            });
            
            if (data && data.deleteUser && data.deleteUser.status === "200") {
                dispatch({
                    type: USER_DELETE_SUCCESS,
                    payload: {
                        deleteLoading: false
                    }
                });
                toastr.success('Success', `${userType === 2 ? 'The driver' : 'The rider'} has been deleted successfully.`);
            } else {
                dispatch({
                    type: USER_DELETE_ERROR,
                    payload: {
                        deleteLoading: false
                    }
                });

                errorMessage = (data && data.deleteUser && data.deleteUser.errorMessage) || "Oops! Something went wrong. Please try again.";
                toastr.error('Error!', errorMessage);
            }
        } catch(err) {
            toastr.error('Error!', err);
            dispatch({
                type: USER_DELETE_ERROR,
                payload: {
                    deleteLoading: false
                }
            });
        }

    }
};