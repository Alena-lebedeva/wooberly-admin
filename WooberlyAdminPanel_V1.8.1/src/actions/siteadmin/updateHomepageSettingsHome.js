import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsHome(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageHome (
                $homeSectionImage1: String
                $homeSectionImage2: String
                $homeSectionImage3: String
                $homeSectionImage4: String
                $homeSectionImage5: String
                $homeSectionImage6: String
                $homeSectionImage7: String
                $homeSectionImage8: String
                $homeSectionButton1: String
                $homeSectionTitle1: String
              ) {
                updateHomePageHome (
                  homeSectionImage1: $homeSectionImage1
                  homeSectionImage2: $homeSectionImage2
                  homeSectionImage3: $homeSectionImage3
                  homeSectionImage4: $homeSectionImage4
                  homeSectionImage5: $homeSectionImage5
                  homeSectionImage6: $homeSectionImage6
                  homeSectionImage7: $homeSectionImage7
                  homeSectionImage8: $homeSectionImage8
                  homeSectionButton1: $homeSectionButton1
                  homeSectionTitle1: $homeSectionTitle1
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('HomeSettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    homeSectionImage1: values && values.homeSectionImage1,
                    homeSectionImage2: values && values.homeSectionImage2,
                    homeSectionImage3: values && values.homeSectionImage3,
                    homeSectionImage4: values && values.homeSectionImage4,
                    homeSectionImage5: values && values.homeSectionImage5,
                    homeSectionImage6: values && values.homeSectionImage6,
                    homeSectionImage7: values && values.homeSectionImage7,
                    homeSectionImage8: values && values.homeSectionImage8,
                    homeSectionButton1: values && values.homeSectionButton1,
                    homeSectionTitle1: values && values.homeSectionTitle1,
                }
            })

            dispatch(setLoaderComplete('HomeSettingsForm'))
            if(data && data.updateHomePageHome && data.updateHomePageHome.status == 200) {
                
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