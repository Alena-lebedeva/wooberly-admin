import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm } from 'redux-form';
import { Table, Form, FormControl } from 'react-bootstrap';
import s from './TableDesign.css';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
//local
import messages from '../../../locale/messages';

class TableDesign extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, fieldClass }) => {
    // const { formatMessage } = this.props.intl;
    return (
      <div>
        <Form.Group className={s.noMargin}>
          <FormControl as="select" className={fieldClass} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </FormControl>
        </Form.Group>
      </div>
    )
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            <FormattedMessage {...messages.table} />
          </div>
          <div className={s.widthInner}>
            <div className={cx(s.tableCss, 'tableCss')}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                    <th> <FormattedMessage {...messages.tableHead} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td>
                      <Field
                        name="State"
                        type="Select"
                        component={this.renderFormControlSelect}
                        labelClass={s.labelText}
                        fieldClass={s.formControlInputTable}
                      />
                    </td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                    <td> <FormattedMessage {...messages.tableCell} /></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TableDesign = reduxForm({
  form: 'TableDesign', // a unique name for this form

})(TableDesign);

export default withStyles(s)(TableDesign);
