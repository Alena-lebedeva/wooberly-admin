import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import getCurrency from './currencyList.graphql';

import {
  CHANGE_CURRENCY_STATUS_START,
  CHANGE_CURRENCY_STATUS_SUCCESS,
  CHANGE_CURRENCY_STATUS_ERROR,
  SET_BASE_CURRENCY_START,
  SET_BASE_CURRENCY_SUCCESS,
  SET_BASE_CURRENCY_ERROR,
  CURRENCY_RATES_FETCH_SUCCESS
} from '../../../constants';

const getCurrencyRatesQuery = gql`{
  getCurrencyRates {
      base
      rates
  }
}
`;

export function updateCurrencyStatus(id, isEnable, symbol) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CHANGE_CURRENCY_STATUS_START,
    });

    try {
      let query = gql`
      query getCurrency($currentPage: Int, $searchList: String){
        getCurrency(currentPage: $currentPage, searchList:$searchList){
          count
          currencyList{
              id
              symbol
              isEnable
              isPayment
              isBaseCurrency
          }
        }
      }
      `
      let baseCurrencyId;
      // Get Base currency data
      let subQuery = gql`
          {
              getBaseCurrency{
                id
                symbol
              }
          }
        `;
      //const {data} = await graphqlRequest(getBaseCurrency, {}, {skipCache: true});
      const { data } = await client.query({ query: subQuery, fetchPolicy: 'network-only' });
      if (data && data.getBaseCurrency) {
        baseCurrencyId = data.getBaseCurrency.id;
      }

      // Warn admind if he/she try to disable the base currency
      if (baseCurrencyId === id) {
        toastr.error("Failed!", "Sorry, you can't disable the base currency. Try to set a different base currency and disable this one");
      } else {
        let mutation = gql`
                mutation updateCurrency ($id: Int, $isEnable: Boolean, $symbol: String){
                  updateCurrency(id: $id, isEnable: $isEnable, symbol: $symbol){
                        status
                    }
                }
            `;

        const { data } = await client.mutate({
          mutation,
          variables: { id, isEnable, symbol },
          refetchQueries: [{ query: getCurrency, variables: { currentPage: '1', searchList: '' } }]
        });

        if (data.updateCurrency.status === 200) {
          dispatch({
            type: CHANGE_CURRENCY_STATUS_SUCCESS,
          });
          toastr.success("Success!", "Currency status has changed");
        } else {
          dispatch({
            type: CHANGE_CURRENCY_STATUS_ERROR,
            payload: {
              error
            }
          });
          toastr.error("Failed!", "Failed to change Currency status");
          return false;
        }
      }

    } catch (error) {

      dispatch({
        type: CHANGE_CURRENCY_STATUS_ERROR,
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

export function setBaseCurrency(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_BASE_CURRENCY_START,
    });

    try {

      let mutation = gql`
            mutation setBaseCurrency($id: Int){
              setBaseCurrency(id: $id){
                    status
                }
            }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: { id },
        refetchQueries: [{ query: getCurrency, variables: { currentPage: '1', searchList: '' } }]
      });

      if (data.setBaseCurrency.status == 200) {
        dispatch({
          type: SET_BASE_CURRENCY_SUCCESS,
        });


        const currency = await client.query({ query: getCurrencyRatesQuery, fetchPolicy: 'network-only' })

        if (currency && currency.data && currency.data.getCurrencyRates) {

          let currencyRates;
          let base = currency.data.getCurrencyRates.base;

          if (currency.data.getCurrencyRates.rates != null) {
            currencyRates = JSON.parse(currency.data.getCurrencyRates.rates);
          }

          toastr.success("Success!", "Base Currency is set successfully");

          dispatch({
            type: CURRENCY_RATES_FETCH_SUCCESS,
            payload: {
              base,
              to: "",
              rates: currencyRates
            }
          })

        }
      }

    } catch (error) {

      dispatch({
        type: SET_BASE_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      toastr.error("Failed!", "Failed to set Base Currency");
      return false;
    }
    return true;
  };
}

export function allowPaymentCurrency(id, isPayment) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_BASE_CURRENCY_START,
    });

    try {

      let mutation = gql`
            mutation allowPaymentCurrency($id: Int,$isPayment: Int){
              allowPaymentCurrency(id: $id,isPayment: $isPayment){
                    status
                }
            }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: { id, isPayment },
        refetchQueries: [{ query: getCurrency }]
      });

      if (data.allowPaymentCurrency.status === 200) {
        dispatch({
          type: SET_BASE_CURRENCY_SUCCESS,
        });
        toastr.success("Success!", "Allowed Payment Currency Success");
      }

    } catch (error) {

      dispatch({
        type: SET_BASE_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      toastr.error("Failed!", "Failed to set allowed payment currency success");
      return false;
    }
    return true;
  };
}
