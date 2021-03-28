import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsCity(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageCity (
                $citySectionTitle1: String
                $citySectionContent1: String
              ) {
                updateHomePageCity (
                  citySectionTitle1: $citySectionTitle1
                  citySectionContent1: $citySectionContent1
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('CitySettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    citySectionTitle1: values && values.citySectionTitle1,
                    citySectionContent1: values && values.citySectionContent1
                }
            })

            dispatch(setLoaderComplete('CitySettingsForm'))
            if(data && data.updateHomePageCity && data.updateHomePageCity.status == 200) {
                
                dispatch({
                    type: HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
                })
                toastr.success('Success', 'Homepage settings changes have been successfully applied')
            } else {
                dispatch({
                    type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
                })
                toastr.error('Oops!', 'Something went wrong')
            }
        } catch(err) {
            dispatch({
                type: HOMEPAGE_SETTINGS_UPLOAD_ERROR
            })
            toastr.error('Oops!', 'Something went wrong')
        }
        
    }
}