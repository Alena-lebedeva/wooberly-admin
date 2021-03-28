import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { reduxForm } from 'redux-form';
import s from './Category.css';
import CategoryList from '../../../components/Category/CategoryList';
import getAllCategoryQuery from './getAllCategory.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
class Category extends React.Component {
  static propTypes = {
    getAllCategory: PropTypes.shape({
      getAllCategory: PropTypes.array
    }),
  };

  static defaultProps = {
    category: {
      loading: true
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { categoryDetails, categoryDetails: { loading, getAllCategory } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.categoryMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <CategoryList categoryDetails={categoryDetails} />
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(getAllCategoryQuery, {
    name: 'categoryDetails',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }))(Category);
