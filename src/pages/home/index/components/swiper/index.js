import React from "react";
import Css from "./index.module.scss";
import {getSlide} from 'src/services/home.js'
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

class AdSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aSwiper: []
    };
  }

  componentDidMount(){
    this.getSwipter()
  }

  getSwipter() {
    getSlide().then((res) => {
      if (res.code === 200) {
        this.setState({ aSwiper: res.data });
      }
    });
  }

  render() {
    return (
       <div className={Css["swiper-wrap"]}>
          <Swiper autoplay={true} pagination={{ clickable: true }}>
            {this.state.aSwiper && this.state.aSwiper.length
              ? this.state.aSwiper.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <a href={item.webs}>
                        <img src={item.image} alt={item.title} />
                      </a>
                    </SwiperSlide>
                  );
                })
              : ""}
          </Swiper>
        </div> 
    );
  }
}
export default AdSwiper;
