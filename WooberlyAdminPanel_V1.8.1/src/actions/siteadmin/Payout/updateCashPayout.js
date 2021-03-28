import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

import {
  SET_CASH_PAYOUT_START,
  SET_CASH_PAYOUT_SUCCESS,
  SET_CASH_PAYOUT_ERROR,
} from '../../../constants';

export function updateCashPayout(id, payoutStatus, currentPage) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_CASH_PAYOUT_START,
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
        mutation updateCashPayout ($id: Int, $payoutStatus: Boolean){
          updateCashPayout(id: $id, payoutStatus: $payoutStatus){
              status
            }
        }`;

        const { data } = await client.mutate({
          mutation,
          variables: { id, payoutStatus },
          refetchQueries: [{ query: getPayoutList, variables: { currentPage, searchList: '' } }]
        });
        
        if (data.updateCashPayout.status == 200) {

          dispatch({
            type: SET_CASH_PAYOUT_SUCCESS,
          });

          toastr.success("Success!", "Updated status for Cash Payout");

        } else {

          dispatch({
            type: SET_CASH_PAYOUT_ERROR
          });

          toastr.error("Oops!", "Failed to update status for Cash Payout");

          return false;
        }
    } catch (error) {

      dispatch({
        type: SET_CASH_PAYOUT_ERROR
      });

      toastr.error("Oops!", "Failed to update status for Cash Payout");

      return false;
    }
    return true;
  };
}
