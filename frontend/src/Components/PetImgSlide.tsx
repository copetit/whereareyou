import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Pagination]);

export interface PetImgSlideProps {
  petImgs: Array<string>;
}

export function PetImgSlide({ petImgs }: PetImgSlideProps) {
  return (
    <div className="pet-img-slide-section mb-8">
      {petImgs.length === 1 ? (
        <div className="img-box">
          <img
            src={`${process.env.REACT_APP_API_URL}/${petImgs[0]}`}
            alt="pet"
          />
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
        >
          {petImgs.map((img: String, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="img-box">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${img}`}
                    alt="pet"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
