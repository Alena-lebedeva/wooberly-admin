import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { googleMapAPI } from '../../../config';

// Google Libraries
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';
import DrawPolygonMap from './DrawPolygonMap';

// Styling
import s from './GooglePolygonMap.css';
import bt from '../../../components/commonStyle.css';
import c from 'react-geosuggest/module/geosuggest.css';

// Locale
import messages from '../../../locale/messages';

class GooglePolygonMap extends React.Component {

  static defaultProps = {
    label: '', 
    className: '', 
    defaultValue: '', 
    containerClassName: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      noResult: false,
      lat: 37.0902,
      lng: -95.7129
    };

    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
  }

  handleSelectSuggest(data) {
    if (data) {
      this.setState({
        lat: data.location && data.location.lat,
        lng: data.location && data.location.lng
      })
    }
  }
  
  render() {
    const { label, className, defaultValue, containerClassName } = this.props;
    const { formName, fieldName, paths } = this.props;
    const { formatMessage } = this.props.intl;
    const { lat, lng } = this.state;

    return (
      <div>
        <label className={bt.labelText} >{formatMessage(messages.searchLocation)}</label>
        <ReactGoogleMapLoader 
        params={{
          key: googleMapAPI,
          libraries: "geometry,drawing,places"
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <Geosuggest
                ref={el => this._geoSuggest = el}
                placeholder={label ? label : formatMessage(messages.searchLocation)}
                initialValue={defaultValue}
                className={cx(s.geosuggest, containerClassName)}
                inputClassName={cx('form-control', s.geosuggestInput, className)}
                suggestsClassName={cx(s.geosuggest__suggests)}
                suggestsHiddenClassName={cx(s.geosuggest__suggests_hidden)}
                onSuggestSelect={this.handleSelectSuggest}
                onSuggestNoResults={(value) => value && this.setState({ noResult: true })}
              />
              <DrawPolygonMap
                lat={lat} 
                lng={lng} 
                formName={formName}
                fieldName={fieldName}
                paths={paths}
              />
            </div>
          )
        }
        />
      </div>
    );
  }
}

export default injectIntl(withStyles(c,s,bt)(GooglePolygonMap));
