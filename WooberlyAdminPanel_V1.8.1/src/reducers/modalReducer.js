import {
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL
} from '../constants';

export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: action.payload.adminRolesModalType
      };

    case CLOSE_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: null
      };

    case OPEN_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: action.payload.adminUserModalType
      };

    case CLOSE_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: null
      };
    
    case OPEN_HEADER_MODAL:
        return {
          ...state,
          [action.payload.modalType]: action.payload.actionValue
        };
  
    case CLOSE_HEADER_MODAL:
          return {
            ...state,
            [action.payload.modalType]: action.payload.actionValue
          };

    default:
      return {
        ...state,
      };
  }
}
