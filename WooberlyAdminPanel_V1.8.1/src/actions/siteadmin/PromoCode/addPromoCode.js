import {
  ADD_PROMOCODE_START,
  ADD_PROMOCODE_SUCCESS,
  ADD_PROMOCODE_ERROR
} from '../../../constants';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import history from '../../../history';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';

const addMutation = gql`
mutation( 
  $title: String!, 
  $description: String!, 
  $code: String!, 
  $type: Int!,
  $promoValue: Float!, 
  $currency: String,
  $expiryDate: String
) {
  addPromoCode(
      title: $title,
      description: $description,
      code: $code,
      type: $type,
      promoValue: $promoValue,
      currency: $currency,
      expiryDate: $expiryDate
  ) {
      status
      errorMessage
  }
}`;

const updateMutation = gql`
mutation( 
  $id: Int!,
  $title: String!, 
  $description: String!, 
  $code: String!, 
  $type: Int!,
  $promoValue: Float!, 
  $currency: String,
  $expiryDate: String,
  $isEnable: String
) {
  updatePromoCode(
      id: $id,
      title: $title,
      description: $description,
      code: $code,
      type: $type,
      promoValue: $promoValue,
      currency: $currency,
      expiryDate: $expiryDate,
      isEnable: $isEnable
  ) {
      status
      errorMessage
  }
}`;

export function addPromoCode(values) {
  return async (dispatch, getState, { client }) => {
    let status, errorMessage = 'Oops! something went wrong! Please try again.';

    try {
      dispatch({
        type: ADD_PROMOCODE_START,
        payload: {
          promoCodeLoading: true
        }
      });

      dispatch(setLoaderStart('AddPromoCode'));

      const mutation = values && values.id ? updateMutation : addMutation;

      const { data } = await client.mutate({
        mutation,
        variables: {
          id: values && values.id,
          title: values && values.title,
          description: values && values.description,
          code: values && values.code,
          type: values && values.type,
          promoValue: values && values.promoValue,
          currency: values && values.currency,
          expiryDate: values && values.expiryDate && values.expiryDate !== '' ? values.expiryDate : null,
          isEnable: values && values.isEnable
        }
      });

      if (data && values.id) {
        status = data.updatePromoCode && data.updatePromoCode.status;
        errorMessage = data.updatePromoCode && data.updatePromoCode.errorMessage;
      } else if (data && !values.id) {
        status = data.addPromoCode && data.addPromoCode.status;
        errorMessage = data.addPromoCode && data.addPromoCode.errorMessage;
      }
      
      if (status && status === 200) {
        history.push('/siteadmin/promo-code/list');
        
        toastr.success('Success', `Promo Code has been ${values && values.id ? 'updated' : 'added'} successfully.`);
        
        await dispatch({
          type: ADD_PROMOCODE_SUCCESS,
          payload: {
            promoCodeLoading: false
          }
        });
        dispatch(setLoaderComplete('AddPromoCode'));
      } else {

        toastr.error('Error!', errorMessage);

        await dispatch({
          type: ADD_PROMOCODE_ERROR,
          payload: {
            promoCodeLoading: false,
            error: errorMessage
          }
        });
        dispatch(setLoaderComplete('AddPromoCode'));
      }
    } catch (error) {
      errorMessage = "Something went wrong! " + error;

      toastr.error('Error!', errorMessage);

      await dispatch({
        type: ADD_PROMOCODE_ERROR,
        payload: {
          promoCodeLoading: false,
          error: errorMessage
        }
      });
    }
  }
}