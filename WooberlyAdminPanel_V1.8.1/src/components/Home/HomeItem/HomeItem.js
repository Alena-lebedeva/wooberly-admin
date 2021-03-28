import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../../config';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './HomeItem.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import Col from 'react-bootstrap/Col';

export class HomeItem extends Component {
    render() {
        const { categoryName, categoryImage } = this.props;

        return (
            <Col xs={12} sm={12} md={12} lg={12} className={s.sliderBox}>
                <div>
                    <img 
                        style={{ maxWidth: 'auto', height: 'auto' }}
                        src={api.apiEndpoint + "/images/category/" + categoryImage}
                    />
                </div>
                <div className={s.sliderBottom}>
                <label className={cx(bt.labelText, s.fontNormal)} >{categoryName}</label>
                </div>
            </Col>
        )
    }
}

const mapStateToProps = (state) => ({ });

const mapDispatchToProps = {};

export default withStyles(s, bt)(connect(mapStateToProps, mapDispatchToProps)(HomeItem)) 
