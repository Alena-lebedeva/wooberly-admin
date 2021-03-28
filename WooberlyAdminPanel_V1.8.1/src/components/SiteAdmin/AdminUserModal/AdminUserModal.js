// General
import React, { Component } from 'react';
// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminUserModal.css';
import {
  Modal
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { closeAdminUserModal } from '../../../actions/siteadmin/modalActions';
// Component
import AdminUserForm from '../AdminUserForm';
//Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class AdminUserModal extends Component {
  static defaultProps = {
    adminUserModalType: 'add'
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { closeAdminUserModal, adminUserModal, adminUserModalType, roles } = this.props;
    return (
      <div>
        <Modal show={adminUserModal} onHide={closeAdminUserModal} className={'wooberlyModal'}>
          <Modal.Header closeButton>
            <Modal.Title><h2> <FormattedMessage {...messages[adminUserModalType == 'add' ? 'addAdminUserLabel' : 'editAdminUserLabel']} /></h2></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <AdminUserForm roles={roles} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
const mapState = (state) => ({
  adminUserModal: state.adminModalStatus.adminUserModal,
  adminUserModalType: state.adminModalStatus.adminUserModalType
});
const mapDispatch = {
  closeAdminUserModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(AdminUserModal));
