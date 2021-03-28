import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

import {
  SET_PAYOUT_START,
  SET_PAYOUT_SUCCESS,
  SET_PAYOUT_ERROR,
} from '../../../constants';

export function updatePayoutStatus(id, isBanStatus) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_PAYOUT_START,
    });

    try {
      let getPayoutList = gql `
      query getPayoutList($currentPage: Int, $searchList: String){
        getPayoutList(currentPage: $currentPage, searchList:$searchList){
          count
        bookingData{
          id
          tripStatus
          driverDetails{
            firstName
            userData{
              email
            }
          }
          totalFare
          isPayoutPaid
          isBanStatus
          paymentType
        }
      }
    }
      `

      let mutation = gql`
        mutation updatePayout ($id: Int!, $isBanStatus: Boolean!){
          updatePayout(id: $id, isBanStatus: $isBanStatus){
              status
              errorMessage
            }
        }`;

        const { data } = await client.mutate({
          mutation,
          variables: { id, isBanStatus},
          refetchQueries: [{ query: getPayoutList, variables: { currentPage: '1', searchList: '' } }]
        });
        
        if (data.updatePayout.status ===200) {

          dispatch({
            type: SET_PAYOUT_SUCCESS,
          });

          toastr.success("Success!", "Update status has success");

        } else {

          dispatch({
            type: SET_PAYOUT_ERROR,
            payload: {
              error
            }
          });

          toastr.error("Failed!", "Failed to Update status");

          return false;
        }
    } catch (error) {

      dispatch({
        type: SET_PAYOUT_ERROR,
        payload: {
          error
        }
      });

      toastr.error("Failed!", "Failed to change Currency status");

      return false;
    }
    return true;
  };
}
