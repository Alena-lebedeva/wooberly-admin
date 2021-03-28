import {
    ADMIN_UPDATE_STATIC_START,
    ADMIN_UPDATE_STATIC_SUCCESS,
    ADMIN_UPDATE_STATIC_ERROR
} from '../../constants';

import gql from 'graphql-tag';
import history from '../../history';
import { toastr } from 'react-redux-toastr';


const mutation = gql`
mutation updateStaticPage(
  $id: Int,
  $content: String,
  $metaTitle: String,
  $metaDescription: String,
  $pageBanner: String,
) {
  updateStaticPage(
    id: $id,
    content: $content,
    metaTitle: $metaTitle,
    metaDescription: $metaDescription,
    pageBanner: $pageBanner,
  ) {
      status
  }
}
`;

const query = gql`query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      pageBanner
      createdAt
  }
}`;

export function updateStaticPage(values) {

    return async (dispatch, getState, { client }) => {
        try {
            dispatch({ type: ADMIN_UPDATE_STATIC_START });
            const { data } = await client.mutate({
                mutation,
                variables: {
                    content: values.content,
                    metaTitle: values.metaTitle,
                    metaDescription: values.metaDescription,
                    pageBanner: values.pageBanner,
                    id: values.id
                },
                refetchQueries: [{ query, variables: { id: values.id } }]
            });


            if (data.updateStaticPage.status == 200) {
                toastr.success("Success!", "Changes are updated!");
                history.push('/siteadmin/staticpage/manage');
                dispatch({ type: ADMIN_UPDATE_STATIC_SUCCESS });
            }
            else {
                toastr.error("Error", "Updating failed");
                dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
            }

        } catch (error) {
            toastr.error("Oops!", "Something went wrong.");
            dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
            return false;
        }
        return true;
    };
}