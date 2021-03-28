
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Page.css';
import { api, staticpageUploadDir } from '../../config'

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };

  render() {
    const { title, html, pageBanner } = this.props;
    return (
      <div>
        {
          pageBanner && <div 
            className={s.backGroungImg}
            style={{ backgroundImage: `url(${api.apiEndpoint + staticpageUploadDir + pageBanner})` }} />
        }
        <div className={s.cotainerWith}>
          <div className={s.staticContainer}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Page);