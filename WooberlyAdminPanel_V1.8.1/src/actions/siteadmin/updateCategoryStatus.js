import gql from 'graphql-tag';
import {
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_START,
    CATEGORY_UPDATE_ERROR
} from '../../constants/index';
import { toastr } from 'react-redux-toastr';

export default function updateCategoryStatus(id, isActive, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CATEGORY_UPDATE_START
        });

        
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
            mutation updateCategoryStatus($id: Int, $isActive: Boolean) {
                updateCategoryStatus(id: $id, isActive: $isActive) {
                  status
                  errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables : {
                    id,
                    isActive: isActive == '1' ? 1 : 0
                },
                refetchQueries: [{ query, variables: { currentPage, searchList: '' } }]
            });
            
            if (data && data.updateCategoryStatus && data.updateCategoryStatus.status ==200) {
                dispatch({
                    type: CATEGORY_UPDATE_SUCCESS
                });
                toastr.success('Success', `The Category status has been updated.`);
            } else {
                dispatch({
                    type: CATEGORY_UPDATE_ERROR
                });

                errorMessage = (data && data.updateCategoryStatus && data.updateCategoryStatus.errorMessage) || "Oops! Something went wrong. Please try again.";
                toastr.error('Error!', errorMessage);
            }
        } catch(err) {
            toastr.error('Error!', err);
            dispatch({
                type: CATEGORY_UPDATE_ERROR
            });
        }

    }
};