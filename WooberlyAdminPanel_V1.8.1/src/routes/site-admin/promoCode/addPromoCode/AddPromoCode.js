import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AddPromoCode.css';
import PromoCodeForm from '../../../../components/SiteAdmin/PromoCode/PromoCodeForm';

class AddPromoCode extends React.Component {
  render() {
    const { title } = this.props;
    
    return (
      <div className={s.paddingRoutesSection}>
        <PromoCodeForm />
      </div>
    );
  }
}

export default withStyles(s)(AddPromoCode);
