import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';
import { Container, Row, Col, Form } from 'react-bootstrap';
import s from './LanguageSwitcher.css';

const localeDict = {
  /* @intl-code-template '${lang}-${COUNTRY}': '${Name}',*/

  // English - en
  // Spanish - es
  // French - fr
  // Russian - ru
  // Japanese - ja	
  // Indonesian - id
  // Croatian - hr
  // Chinese - zh
  // Swedish - sv

  'en-US': 'English',
  'es': 'Español',
  'fr-FR': 'Français',
  'ru-RU': 'Pусский',
  'ja-JP': '日本人',
  'id-ID': 'Indonesia',
  'hr-HR': 'Croatian',
  'zh-CN': '中文',
  'sv-SE': 'Svenska'

  /* @intl-code-template-end */
};

class LanguageSwitcher extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.string.isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
    setLocale: PropTypes.func.isRequired,
  };

  render() {
    const { currentLocale, availableLocales, setLocale } = this.props;
    const localeName = locale => localeDict[locale] || locale;

    return (
      <div className={s.root}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control value={currentLocale} as="select" onChange={(event) => {
            setLocale({ locale: event.target.value });
          }}>
            {
              availableLocales.map(locale => (
                <option key={locale} value={locale}>{localeName(locale)}</option>
              ))
            }
          </Form.Control>
        </Form.Group>
        {/* {availableLocales.map(locale => (
          <span key={locale}>
            {isSelected(locale) ? (
              <span>{localeName(locale)}</span>
            ) : (
              <a
                href={`?lang=${locale}`}
                onClick={e => {
                  setLocale({ locale });
                  e.preventDefault();
                }}
              >
                {localeName(locale)}
              </a>
            )}{' '}
          </span>
        ))} */}
      </div>
    );
  }
}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  setLocale,
};

export default connect(mapState, mapDispatch)(withStyles(s)(LanguageSwitcher));
