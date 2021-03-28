import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
    HOMEPAGE_SETTINGS_UPLOAD_START,
    HOMEPAGE_SETTINGS_UPLOAD_ERROR,
    HOMEPAGE_SETTINGS_UPLOAD_SUCCESS
} from '../../constants/index'
import { setLoaderStart,  setLoaderComplete } from '../loader/loader'

export default function updateHomepageSettingsFooter(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: HOMEPAGE_SETTINGS_UPLOAD_START
        })

        try {
            
            const mutation = gql`
            mutation updateHomePageFooter (
                $footerLogo1: String
                $footerLogo2: String
                $footerLogo3: String
                $footerLogo4: String
                $footerTitle1: String
                $footerContent1: String
                $footerLink1: String
                $footerLink2: String
                $footerLink3: String
                $footerLink4: String
                $footerLinkName1: String
                $footerLinkName2: String
                $footerLinkName3: String
                $footerLinkName4: String
                $footerLinkTitle: String
                $footerBottom: String
              ) {
                updateHomePageFooter (
                  footerLogo1: $footerLogo1
                  footerLogo2: $footerLogo2
                  footerLogo3: $footerLogo3
                  footerLogo4: $footerLogo4
                  footerTitle1: $footerTitle1
                  footerContent1: $footerContent1
                  footerLink1: $footerLink1
                  footerLink2: $footerLink2
                  footerLink3: $footerLink3
                  footerLink4: $footerLink4
                  footerLinkName1: $footerLinkName1
                  footerLinkName2: $footerLinkName2
                  footerLinkName3: $footerLinkName3
                  footerLinkName4: $footerLinkName4
                  footerLinkTitle: $footerLinkTitle
                  footerBottom: $footerBottom
                ) {
                  status
                }
              }
            `
            dispatch(setLoaderStart('FooterSettingsForm'))
            const { data } = await client.mutate({
                mutation,
                variables: {
                    footerLogo1: values && values.footerLogo1,
                    footerLogo2: values && values.footerLogo2,
                    footerLogo3: values && values.footerLogo3,
                    footerLogo4: values && values.footerLogo4,
                    footerTitle1: values && values.footerTitle1,
                    footerContent1: values && values.footerContent1,
                    footerLink1: values && values.footerLink1,
                    footerLink2: values && values.footerLink2,
                    footerLink3: values && values.footerLink3,
                    footerLink4: values && values.footerLink4,
                    footerLinkName1: values && values.footerLinkName1,
                    footerLinkName2: values && values.footerLinkName2,
                    footerLinkName3: values && values.footerLinkName3,
                    footerLinkName4: values && values.footerLinkName4,
                    footerLinkTitle: values && values.footerLinkTitle,
                    footerBottom: values && values.footerBottom,
                }
            })

            dispatch(setLoaderComplete('FooterSettingsForm'))
            if(data && data.updateHomePageFooter && data.updateHomePageFooter.status == 200) {
                
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