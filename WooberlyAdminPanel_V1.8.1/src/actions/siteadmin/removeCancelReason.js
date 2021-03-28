import gql from 'graphql-tag';
import {
    CANCEL_REASON_DELETE_SUCCESS,
    CANCEL_REASON_DELETE_START,
    CANCEL_REASON_DELETE_ERROR
} from '../../constants/index';
import { toastr } from 'react-redux-toastr';

export default function removeCancelReason(id, currentPage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CANCEL_REASON_DELETE_START
        });
        
        try {
            let errorMessage;

            let query = gql `
            query getAllCancelReason ($searchList: String $currentPage: Int) {
                getAllCancelReason(searchList: $searchList currentPage: $currentPage) {
                  count
                  result{
                    id
                    reason
                    userType
                    isActive
                  }
                  status
                }
              }
            `;

            let mutation = gql`
            mutation($id: Int) {
                removeCancelReason(id: $id) {
                    status
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
            
            if (data && data.removeCancelReason && data.removeCancelReason.status == "200") {
                dispatch({
                    type: CANCEL_REASON_DELETE_SUCCESS
                });
                toastr.success('Success', `Cancel Reason has been deleted successfully.`);
            } else {
                dispatch({
                    type: CANCEL_REASON_DELETE_ERROR
                });

                toastr.error('Oops!', 'Cancel Reason deletion failed');
            }
        } catch(err) {
            dispatch({
                type: CANCEL_REASON_DELETE_ERROR
            });
            toastr.error('Oops!', 'Cancel Reason deletion failed');
        }

    }
};