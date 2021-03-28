import {
  UPDATE_PRICING_STATUS_START,
  UPDATE_PRICING_STATUS_SUCCESS,
  UPDATE_PRICING_STATUS_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

const mutation = gql`
mutation($id: Int!, $isActive: Boolean) {
  updatePricingStatus(id: $id, isActive: $isActive) {
      status
      errorMessage    
  }
}`;

export function updatePricingStatus(id, isActive) {
  return async (dispatch, getState, { client }) => {
    let successMessage;
    try {
      dispatch({
        type: UPDATE_PRICING_STATUS_START,
        payload: {
          pricingLoading: true
        }
      });

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          isActive
        }
      });

      if (data && data.updatePricingStatus && data.updatePricingStatus.status === 200) {
        successMessage = `The fare has been activated successfully.`;
        if (!isActive) { 
          successMessage = `The fare has been deactivated successfully.`; 
        }

        toastr.success('Success', successMessage);

        await dispatch({
          type: UPDATE_PRICING_STATUS_SUCCESS,
          payload: {
            pricingLoading: false
          }
        });

        return await {
          status: 200
        };
      } else {
        toastr.error('Error!', data && data.updatePricingStatus && data.updatePricingStatus.errorMessage);

        await dispatch({
          type: UPDATE_PRICING_STATUS_ERROR,
          payload: {
            pricingLoading: false,
            error: data && data.updatePricingStatus && data.updatePricingStatus.errorMessage
          }
        });

        return await {
          status: 400
        };
      }
    } catch (error) {
      toastr.error('Error!', "Something went wrong! " + error);

      await dispatch({
        type: UPDATE_PRICING_STATUS_ERROR,
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