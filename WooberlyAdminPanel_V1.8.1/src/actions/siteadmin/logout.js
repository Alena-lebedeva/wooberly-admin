import gql from 'graphql-tag';
import history from '../../history';
import {
    ADMIN_USER_LOGOUT_START,
    ADMIN_USER_LOGOUT_SUCCESS,
    ADMIN_USER_LOGOUT_ERROR,
    SET_RUNTIME_VARIABLE
} from '../../constants';

export function adminLogout() {
    return async (dispatch, getState, { client }) => {

        const query = gql`
        query {
            adminUserLogout {
                status
            }
          }
        `;

        dispatch({
            type: ADMIN_USER_LOGOUT_START
        })

        try {
            const { data } = await client.query({
                query,
                fetchPolicy: 'network-only'
            })
            if (data && data.adminUserLogout && data.adminUserLogout.status === 200) {
                history.push('/login')

                dispatch({
                    type: ADMIN_USER_LOGOUT_SUCCESS
                })

                dispatch({
                    type: SET_RUNTIME_VARIABLE,
                    payload: {
                        name: 'isAdminAuthenticated',
                        value: false
                    }
                })
            } else {
                dispatch({
                    type: ADMIN_USER_LOGOUT_ERROR
                });
            }
        } catch (error) {
            dispatch({
                type: ADMIN_USER_LOGOUT_ERROR,
                payload: {
                    error
                }
            });
            return false;
        }
        return true;
    }
}