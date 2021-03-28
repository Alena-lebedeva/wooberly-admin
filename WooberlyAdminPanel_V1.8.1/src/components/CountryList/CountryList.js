import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql } from 'react-apollo';

import {
    Form
} from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { change } from 'redux-form';
import getCountries from './getCountries.graphql';

class CountryList extends Component {

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            getCountries: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                countryCode: PropTypes.string.isRequired,
                countryName: PropTypes.string.isRequired,
                isEnable: PropTypes.bool.isRequired
            }).isRequired)
        }).isRequired,
        isEmptyFirst: PropTypes.bool,
        formatMessage: PropTypes.any
    };

    static defaultProps = {
        data: {
            getCountries: []
        },
        isEmptyFirst: false,
        dialCode: false
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(e, input) {
        const { data: { loading, getCountries }, dialCode, getSelected, change, formName } = this.props;

        let selectedItem = null;
        let currentValue = e.target.value;

        if (!loading && getCountries) {
            if (dialCode) {
                selectedItem = getCountries.find(o => o.dialCode == currentValue);
            } else {
                selectedItem = getCountries.find(o => o.countryCode == currentValue);
            }
        }

        if (getSelected) {
            getSelected(e, selectedItem);
            if (formName === 'EditRiderForm') {
                await change(formName, 'phoneCountryCode', selectedItem.countryCode);
                await change(formName, 'phoneDialCode', selectedItem.dialCode);
            } else if (formName === 'EditDriverForm') {
                await change(formName, 'phoneCountryCode', selectedItem.countryCode);
                await change(formName, 'phoneDialCode', selectedItem.dialCode);
            }
        }

        return e;
    }

    render() {
        const { data: { loading, getCountries }, className, input, isEmptyFirst, dialCode, onChange, disabled } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <Form.Control as="select"
                    className={className}
                    {...input}
                    disabled={disabled}
                    onChange={(e) => {
                        input.onChange(e);
                        this.handleChange(e, input);
                    }}
                >
                    {
                        loading && <option>{formatMessage(messages.country)}</option>
                    }

                    {
                        !loading && isEmptyFirst && <option value="">{formatMessage(messages.chooseCountry)}</option>
                    }

                    {
                        !loading && getCountries != null && getCountries.length > 0 && !dialCode && getCountries.map((item) => {
                            return (
                                <option value={item.countryCode} key={item.id}>{item.countryName}</option>
                            )
                        })
                    }
                    {
                        !loading && getCountries != null && getCountries.length > 0 && dialCode && getCountries.map((item) => {
                            return (
                                <option value={item.dialCode} key={item.id}>{item.countryName}</option>
                            )
                        })
                    }
                </Form.Control>
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    change
};

export default compose(
    injectIntl,
    connect(mapState, mapDispatch),
    graphql(getCountries, { options: { ssr: true } })
)(CountryList);
