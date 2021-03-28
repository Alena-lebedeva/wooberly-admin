import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsAbout(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageAbout (
                $aboutGridImage1: String
                $aboutGridImage2: String
                $aboutGridTitle1: String
                $aboutGridTitle2: String
                $aboutGridTitle3: String
                $aboutGridTitle4: String
                $aboutGridTitle5: String
                $aboutGridTitle6: String
                $aboutGridContent1: String
                $aboutGridContent2: String
                $aboutGridContent3: String
                $aboutGridContent4: String
                $aboutGridContent5: String
                $aboutGridContent6: String
              ) {
                updateHomePageAbout (
                  aboutGridImage1: $aboutGridImage1
                  aboutGridImage2: $aboutGridImage2
                  aboutGridTitle1: $aboutGridTitle1
                  aboutGridTitle2: $aboutGridTitle2
                  aboutGridTitle3: $aboutGridTitle3
                  aboutGridTitle4: $aboutGridTitle4
                  aboutGridTitle5: $aboutGridTitle5
                  aboutGridTitle6: $aboutGridTitle6
                  aboutGridContent1: $aboutGridContent1
                  aboutGridContent2: $aboutGridContent2
                  aboutGridContent3: $aboutGridContent3
                  aboutGridContent4: $aboutGridContent4
                  aboutGridContent5: $aboutGridContent5
                  aboutGridContent6: $aboutGridContent6
                  
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('AboutSettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    aboutGridImage1: values && values.aboutGridImage1,
                    aboutGridImage2: values && values.aboutGridImage2,
                    aboutGridTitle1: values && values.aboutGridTitle1,
                    aboutGridTitle2: values && values.aboutGridTitle2,
                    aboutGridTitle3: values && values.aboutGridTitle3,
                    aboutGridTitle4: values && values.aboutGridTitle4,
                    aboutGridTitle5: values && values.aboutGridTitle5,
                    aboutGridTitle6: values && values.aboutGridTitle6,
                    aboutGridContent1: values && values.aboutGridContent1,
                    aboutGridContent2: values && values.aboutGridContent2,
                    aboutGridContent3: values && values.aboutGridContent3,
                    aboutGridContent4: values && values.aboutGridContent4,
                    aboutGridContent5: values && values.aboutGridContent5,
                    aboutGridContent6: values && values.aboutGridContent6
                }
            })

            dispatch(setLoaderComplete('AboutSettingsForm'))
            if(data && data.updateHomePageAbout && data.updateHomePageAbout.status == 200) {
                
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