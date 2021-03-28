import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsSignup(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageSignup (
                $signupGridImage1: String
                $signupGridImage2: String
                $signupGridImage3: String
                $signupGridTitle1: String
                $signupGridContent1: String
                $signupGridLink1: String
                $signupGridLink2: String
              ) {
                updateHomePageSignup (
                  signupGridImage1: $signupGridImage1
                  signupGridImage2: $signupGridImage2
                  signupGridImage3: $signupGridImage3
                  signupGridTitle1: $signupGridTitle1
                  signupGridContent1: $signupGridContent1
                  signupGridLink1: $signupGridLink1
                  signupGridLink2: $signupGridLink2
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('SignupSettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    signupGridImage1: values && values.signupGridImage1,
                    signupGridImage2: values && values.signupGridImage2,
                    signupGridImage3: values && values.signupGridImage3,
                    signupGridTitle1: values && values.signupGridTitle1,
                    signupGridContent1: values && values.signupGridContent1,
                    signupGridLink1: values && values.signupGridLink1,
                    signupGridLink2: values && values.signupGridLink2
                }
            })

            dispatch(setLoaderComplete('SignupSettingsForm'))
            if(data && data.updateHomePageSignup && data.updateHomePageSignup.status == 200) {
                
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