import {
  DELETE_PRICING_START,
  DELETE_PRICING_SUCCESS,
  DELETE_PRICING_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

const mutation = gql`
mutation($id: Int!) {
  deletePricing(id: $id) {
      status
      errorMessage    
  }
}`;

export function deletePricing(id) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: DELETE_PRICING_START,
        payload: {
          pricingLoading: true
        }
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id
        }
      });

      if (data && data.deletePricing && data.deletePricing.status === 200) {
        toastr.success('Success', `The fare has been deleted successfully.`);

        await dispatch({
          type: DELETE_PRICING_SUCCESS,
          payload: {
            pricingLoading: false
          }
        });

        return await {
          status: 200
        };
      } else {
        toastr.error('Error!', data && data.deletePricing && data.deletePricing.errorMessage);

        await dispatch({
          type: DELETE_PRICING_ERROR,
          payload: {
            pricingLoading: false,
            error: data && data.deletePricing && data.deletePricing.errorMessage
          }
        });

        return await {
          status: 400
        };
      }
    } catch (error) {
      toastr.error('Error!', "Something went wrong! " + error);

      await dispatch({
        type: DELETE_PRICING_ERROR,
        payload: {
          pricingLoading: false,
          error: "Something went wrong! " + error
        }
      });

      return await {
        status: 400
      };
    }
  }
}