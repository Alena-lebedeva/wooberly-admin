import gql from 'graphql-tag';
import {
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_START,
    CATEGORY_DELETE_ERROR
} from '../../constants/index';
import { toastr } from 'react-redux-toastr';
import { setLoaderComplete, setLoaderStart } from '../loader/loader'

export default function deleteCategory(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_DELETE_START
        });

        dispatch(setLoaderStart('DeleteCategory'));
        try {
            let errorMessage;

            let query = gql`
            query getAllCategory($currentPage: Int, $searchList: String){
                getAllCategory(currentPage: $currentPage, searchList: $searchList){
                 count
                  categoryData{
                      id
                      categoryName
                      categoryImage
                      categoryMarkerImage
                      basePrice
                      minutePrice
                      unitPrice
                      riderFeeValue
                      driverFeeValue
                      isActive
                      currency
                      capacity
                      createdAt
                      updatedAt
                  }
                }
              }
            `
            

            let mutation = gql`
            mutation deleteCategory($id: Int) {
                deleteCategory(id: $id) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables : {
                    id
                },
                refetchQueries: [{ query, variables: { currentPage, searchList: '' } }]
            });

            dispatch(setLoaderComplete('DeleteCategory'));
            
            if (data && data.deleteCategory && data.deleteCategory.status == 200) {
                
                dispatch({
                    type: CATEGORY_DELETE_SUCCESS
                });
                toastr.success('Success', `The Category has been deleted.`);

            } else if (data && data.deleteCategory && data.deleteCategory.status == 404) {
                
                dispatch({
                    type: CATEGORY_DELETE_ERROR
                });

            } else {
                
                dispatch({
                    type: CATEGORY_DELETE_ERROR
                });

                errorMessage = (data && data.deleteCategory && data.deleteCategory.errorMessage) || "Oops! Something went wrong. Please try again.";
                toastr.error('Error!', errorMessage);
            }
        } catch(err) {
            toastr.error('Error!', err);
            dispatch({
                type: CATEGORY_DELETE_ERROR
            });
        }

    }
};