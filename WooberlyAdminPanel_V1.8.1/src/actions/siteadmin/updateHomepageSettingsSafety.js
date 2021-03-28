import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsSafety(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageSafety (
                $safetyGridImage1: String
                $safetyGridImage2: String
                $safetyGridImage3: String
                $safetyGridTitle1: String
                $safetyGridContent1: String
                $safetyGridLink1: String
                $safetyGridLink2: String
              ) {
                updateHomePageSafety (
                  safetyGridImage1: $safetyGridImage1
                  safetyGridImage2: $safetyGridImage2
                  safetyGridImage3: $safetyGridImage3
                  safetyGridTitle1: $safetyGridTitle1
                  safetyGridContent1: $safetyGridContent1
                  safetyGridLink1: $safetyGridLink1
                  safetyGridLink2: $safetyGridLink2
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('SafetySettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    safetyGridImage1: values && values.safetyGridImage1,
                    safetyGridImage2: values && values.safetyGridImage2,
                    safetyGridImage3: values && values.safetyGridImage3,
                    safetyGridTitle1: values && values.safetyGridTitle1,
                    safetyGridContent1: values && values.safetyGridContent1,
                    safetyGridLink1: values && values.safetyGridLink1,
                    safetyGridLink2: values && values.safetyGridLink2
                }
            })

            dispatch(setLoaderComplete('SafetySettingsForm'))
            if(data && data.updateHomePageSafety && data.updateHomePageSafety.status == 200) {
                
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