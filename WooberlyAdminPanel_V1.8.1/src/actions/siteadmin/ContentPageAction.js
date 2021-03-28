import  gql  from 'graphql-tag';

import {
    ADMIN_DELETE_CONTENTPAGE_START,
    ADMIN_DELETE_CONTENTPAGE_SUCCESS,
    ADMIN_DELETE_CONTENTPAGE_ERROR
} from '../../constants';

import history from '../../history';
import { toastr } from 'react-redux-toastr';



export function deleteContentPageDetails(id) {
    return async (dispatch, getState, { client }) => {

        dispatch({
            type: ADMIN_DELETE_CONTENTPAGE_START,
            data: id
        });
        try {

            let query = gql`
query getContentPageDetails {
    getContentPageDetails{
      id
      metaTitle
      metaDescription
      pageUrl
      pageTitle
      content
      isEnable
      createdAt
    }
  }
`;

            let mutation = gql`
                mutation deleteContentPage ($id: Int!) {
                    deleteContentPage (id: $id) {
                        status
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query }]
            });

            if (data.deleteContentPage.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_CONTENTPAGE_SUCCESS
                });
                toastr.success("Delete Content Page Details", "Deleted successfully!");
                history.push('/siteadmin/contentpage/manage');
            } else {
                toastr.success("Delete Content Page Details", "Deleted failed!");
            }

        } catch (error) {

            dispatch({
                type: ADMIN_DELETE_CONTENTPAGE_ERROR,
                payload: {
                    error
                }
            });
        }
    }
}

export function updateContentPageStatus(id, isEnable) {
    return async (dispatch, getState, { client }) => {
        try {

            let query = gql`
query getContentPageDetails {
    getContentPageDetails{
      id
      metaTitle
      metaDescription
      pageUrl
      pageTitle
      content
      isEnable
      createdAt
    }
  }
`;

        let mutation = gql`
            mutation updateContentPageStatus ($id: Int, $isEnable: Boolean) {
                updateContentPageStatus(id: $id, isEnable: $isEnable){
                    status
                }
            }
        `;        
        
        const { data } = await client.mutate({
            mutation,
            variables: { id, isEnable },
            refetchQueries: [{ query }]
        });

        if( data && data.updateContentPageStatus && data.updateContentPageStatus.status == "success") {
            toastr.success("Success!", "Status has changed");
        }

        } catch (error) {
            toastr.error("Failed!", "Failed to change  status");
        }
    }
}

