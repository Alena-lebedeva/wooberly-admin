import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './HomeSlider.css';
import cx from 'classnames';
//Swiper
//import Swiper from 'react-id-swiper';
// React-Slick
import Slider from 'react-slick';

import HomeItem from '../HomeItem';

class HomeSlider extends React.Component {
  static defaultProps = {
    data: [],
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
            centerMode: true,
          },
        },
      ],
    };

    return (
      <div className={s.root}>
        <div className={s.paddingTopBottom}>
          <div className={cx(s.sliderMain, 'sliderCommon')}>
            <Slider {...settings}>
              {data &&
                data.result &&
                data.result.length > 0 &&
                data.result.map((item, index) => {
                  return (
                    <div>
                      <HomeItem
                        key={index}
                        categoryName={item.categoryName}
                        categoryImage={item.categoryImage}
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HomeSlider);
