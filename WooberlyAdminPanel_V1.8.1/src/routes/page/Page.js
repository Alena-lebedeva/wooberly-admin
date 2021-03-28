import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Page.css';

import ContentPage from '../../components/ContentPage/ContentPage';

class Page extends React.Component {
    static propTypes = {
         data: PropTypes.any
    }

    render() {
        const {  data } =  this.props;
        let title = data.getContentPage.metaTitle;
        return (
            <div>
                <ContentPage title={title} data={data}/>
            </div>
        )
    }
}

export default withStyles(s)(Page);