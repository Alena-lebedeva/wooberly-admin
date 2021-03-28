import {
    SITE_SETTINGS_ERROR,
    SITE_SETTINGS_START,
    SITE_SETTINGS_SUCCESS
} from '../../constants';
import gql from 'graphql-tag'

export function siteSettings() {
    return async (dispatch, getState, { client }) => {

        dispatch({
            type: SITE_SETTINGS_START
        })

        const query = gql `
            query getSiteSettings {
                getSiteSettings{
                name
                value
                }
            }
            `
        try {
            
            const { data } = await client.query({
                query
            })

            let settingsData = {};

            if (data && data.getSiteSettings) {

                data.getSiteSettings.map((item, key) => {
                    settingsData[item.name] = item.value;
                  });
                

                dispatch({
                    type: SITE_SETTINGS_SUCCESS,
                    data: settingsData
                })

                
            } else {
                dispatch({
                    type: SITE_SETTINGS_ERROR
                });
            }
        } catch (error) {
            dispatch({
                type: SITE_SETTINGS_ERROR,
            });
        }
    }
}