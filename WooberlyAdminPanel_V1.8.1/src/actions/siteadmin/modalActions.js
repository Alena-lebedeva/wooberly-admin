import {
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL
} from '../../constants';

import { initialize } from 'redux-form';

export function openAdminRolesModal(type, formData) {
  return (dispatch, getState) => {
    if (type === 'edit') {
      dispatch(initialize("AdminRolesForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: true,
        adminRolesModalType: type
      }
    });
  }
}

export function closeAdminRolesModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: false
      }
    });
  }
}

export function openAdminUserModal(type, formData) {
  return (dispatch, getState) => {
    if (type === 'edit') {
      dispatch(initialize("AdminUserForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: true,
        adminUserModalType: type
      }
    });
  }
}

export function closeAdminUserModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: false
      }
    });
  }
}

export function openHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: true
      }
    });
  }; 
}

export function closeHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: false
      }
    });
  }; 
}

