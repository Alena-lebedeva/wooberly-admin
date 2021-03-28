import {
  ADD_UPDATE_PRICING_START,
  ADD_UPDATE_PRICING_SUCCESS,
  ADD_UPDATE_PRICING_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';

const mutation = gql`
mutation($id: Int, $categoryId: Int!, $locationId: Int!, $unitPrice: Float, $minutePrice: Float, $basePrice: Float,
  $currency: String!, $riderFeeType: String, $riderFeeValue: Float, $driverFeeType: String, $driverFeeValue: Float, 
  $isActive: Boolean, $isSurgePrice: Boolean) {
  addUpdatePricing(id: $id, categoryId: $categoryId, locationId: $locationId, unitPrice: $unitPrice,
      minutePrice: $minutePrice, basePrice: $basePrice, currency: $currency, riderFeeType: $riderFeeType,
      riderFeeValue:$riderFeeValue, driverFeeType: $driverFeeType, driverFeeValue: $driverFeeValue, 
      isActive: $isActive, isSurgePrice: $isSurgePrice) {
      id
      status
      errorMessage    
  }
}`;

export function addUpdatePricing(
  id, 
  locationId,
  categoryId,
  currency,
  basePrice,
  unitPrice,
  minutePrice,
  riderFeeType,
  riderFeeValue,
  driverFeeType,
  driverFeeValue,
  isActive
) {
  return async (dispatch, getState, { client }) => {
    let successMessage;
    try {
      dispatch({
        type: ADD_UPDATE_PRICING_START,
        payload: {
          pricingLoading: true
        }
      });

      dispatch(setLoaderStart('PricingForm'));

      const { data } = await client.mutate({
        mutation,
        variables: {
          id, 
          locationId,
          categoryId,
          currency,
          basePrice,
          unitPrice,
          minutePrice,
          riderFeeType,
          riderFeeValue,
          driverFeeType,
          driverFeeValue,
          isActive
        }
      });

      if (data && data.addUpdatePricing && data.addUpdatePricing.status === 200) {
        successMessage = `The fare has been added successfully.`;
        if (id) { 
          successMessage = `The fare has been updated successfully.`; 
        }

        history.push('/siteadmin/pricing/list');

        toastr.success('Success', successMessage);

        await dispatch({
          type: ADD_UPDATE_PRICING_SUCCESS,
          payload: {
            pricingLoading: false
          }
        });

        dispatch(setLoaderComplete('PricingForm'));

        return await {
          status: 200
        };
      } else {
        toastr.error('Error!', data && data.addUpdatePricing && data.addUpdatePricing.errorMessage);

        await dispatch({
          type: ADD_UPDATE_PRICING_ERROR,
          payload: {
            pricingLoading: false,
            error: data && data.addUpdatePricing && data.addUpdatePricing.errorMessage
          }
        });

        dispatch(setLoaderComplete('PricingForm'));

        return await {
          status: 400
        };
      }
    } catch (error) {
      toastr.error('Error!', "Something went wrong! " + error);

      await dispatch({
        type: ADD_UPDATE_PRICING_ERROR,
        payload: {
          pricingLoading: false,
          error: "Something went wrong! " + error
        }
      });

      dispatch(setLoaderComplete('PricingForm'));

      return await {
        status: 400
      };
    }
  }
}