import {
    ADD_CANCEL_REASON_START,
    ADD_CANCEL_REASON_SUCCESS,
    ADD_CANCEL_REASON_ERROR
} from '../../constants/index';

import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import history from '../../history';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

let addMutation = gql `
mutation(
    $userType: Int, 
    $reason: String, 
    $isActive: Boolean) {
    addCancelReason(
        userType: $userType, 
        reason: $reason, 
        isActive: $isActive
        ) {
        status
    }
}
`

let updateMutation = gql `
mutation(
    $id: Int, 
    $userType: Int, 
    $reason: String, 
    $isActive: Boolean
    ) {
    updateCancelReason(
        id: $id, 
        userType: $userType, 
        reason: $reason, 
        isActive: $isActive
        ) {
        status
    }
}
`

export function addCancelReason(values) {
   
    return async (dispatch, getState, { client }) => {
       
        values.isActive = Number(values.isActive);

        let status, errorMessage = 'Oops! something went wrong! Please try again.';
        try {

            dispatch({ 
                type: ADD_CANCEL_REASON_START
            })

            dispatch(setLoaderStart('AddCancellation'));

            let mutation = values && values.id ? updateMutation : addMutation

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id: values && values.id,
                    reason: values && values.reason,
                    userType: values && values.userType,
                    isActive: values && values.isActive 
                }
            })

        
            if (data && values.id) {
                status = data.updateCancelReason && data.updateCancelReason.status;
            } else if (data) {
                status = data.addCancelReason && data.addCancelReason.status;
            }

            if (status && status == '200') {
                history.push('/siteadmin/cancel-reasons');
                
                toastr.success('Success', `Cancel Reason has been ${values && values.id ? 'updated' : 'added'} successfully.`);
                
                dispatch(setLoaderComplete('AddCancellation'));
                
                await dispatch({
                  type: ADD_CANCEL_REASON_SUCCESS,
                });

            } else {
                dispatch(setLoaderComplete('AddCancellation'));
                toastr.error('Error!', errorMessage);
        
                await dispatch({
                    type: ADD_CANCEL_REASON_ERROR,
                });
            }

        } catch(err) {
            errorMessage = "Something went wrong! " + err;
            toastr.error('Error!', errorMessage);
            
            dispatch({ type: ADD_CANCEL_REASON_ERROR })
        }
    }
}