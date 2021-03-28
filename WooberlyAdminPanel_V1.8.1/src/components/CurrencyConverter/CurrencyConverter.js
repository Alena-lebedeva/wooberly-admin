import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedNumber } from 'react-intl';

// Helper
import { convert } from '../../helpers/currencyConvertion';

class CurrencyConverter extends Component {

  static propTypes = {
    from: PropTypes.string,
    amount: PropTypes.number,
    base: PropTypes.string,
    rates: PropTypes.object,
    superSymbol: PropTypes.bool,
    className: PropTypes.string,
    toCurrency: PropTypes.string,
  };

  static defaultProps = {
    amount: 0,
    superSymbol: false,
    base: null,
    rates: null
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { from, amount, superSymbol, className } = this.props;
    const { base, rates, toCurrency, locale } = this.props;
    
    let targetCurrency;
    let convertedAmount = amount;
    let fromCurrency = from || base;

    if (rates != null) {
      convertedAmount = convert(base, rates, amount, fromCurrency, toCurrency);
    }

    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = base;
    }

    return (
      <span className={className}>
        <FormattedNumber
          value={convertedAmount}
          style="currency"
          currency={targetCurrency || 'USD'}
          minimumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
          maximumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
          currencyDisplay={"symbol"}
          locale={locale}
        />
        {
          superSymbol && <sup>{targetCurrency}</sup>
        }
      </span>
    )
  }
}

const mapState = (state) => ({
  base: state.currency.base,
  toCurrency: state.currency.to,
  rates: state.currency.rates,
  locale: state.intl.locale
});

const mapDispatch = {};

export default injectIntl(connect(mapState, mapDispatch)(CurrencyConverter));


