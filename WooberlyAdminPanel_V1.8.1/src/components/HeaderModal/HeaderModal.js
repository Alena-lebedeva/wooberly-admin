// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './HeaderModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeHeaderModal } from '../../actions/siteadmin/modalActions';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';

import LanguageModal from '../LanguageModal';

class HeaderModal extends Component {

  static defaultProps = {
    modalType: 'languageModal'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeHeaderModal, modalStatus, modalType } = this.props;

    return (
      <div>
        <Modal
          show={modalStatus}
          animation={false}
          onHide={() => closeHeaderModal(modalType)}
          dialogClassName={cx(s.logInModalContainer, 'wooberlyModal', 'wooberlyModalWidth')}
        >
          <Modal.Header closeButton>
            <Modal.Title className={s.textCenter}>
              <h2><FormattedMessage {...messages.chooseLanguageLabel} /></h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div>
              {
                <LanguageModal />
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  modalStatus: state.adminModalStatus.languageModal
});

const mapDispatch = {
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(HeaderModal));