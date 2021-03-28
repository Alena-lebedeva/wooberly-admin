import {
  DELETE_PROMOCODE_START,
  DELETE_PROMOCODE_SUCCESS,
  DELETE_PROMOCODE_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import query from '../../../routes/site-admin/promoCode/promoCodeList/getAllPromoCode.graphql';

const mutation = gql`
mutation( 
  $id: Int!
) {
  deletePromoCode(
      id: $id
  ) {
      status
      errorMessage
  }
}`;

export function deletePromoCode(id) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: DELETE_PROMOCODE_START,
        payload: {
          promoCodeLoading: true
        }
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id
        },
        refetchQueries: [
          {
            query,
            variables: {
              currentPage: 1
            }
          }
        ]
      });

      if (data && data.deletePromoCode && data.deletePromoCode.status === 200) {
        toastr.success('Success', `Promo Code has been deleted successfully.`);

        await dispatch({
          type: DELETE_PROMOCODE_SUCCESS,
          payload: {
            promoCodeLoading: false
          }
        });
      } else {
        toastr.error('Error!', data && data.deletePromoCode && data.deletePromoCode.errorMessage);

        await dispatch({
          type: DELETE_PROMOCODE_ERROR,
          payload: {
            promoCodeLoading: false,
            error: data && data.deletePromoCode && data.deletePromoCode.errorMessage
          }
        });
      }
    } catch (error) {
      toastr.error('Error!', "Something went wrong! " + error);

      await dispatch({
        type: DELETE_PROMOCODE_ERROR,
        payload: {
          promoCodeLoading: false,
          error: "Something went wrong! " + error
        }
      });
    }
  }
}