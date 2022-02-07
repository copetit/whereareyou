import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Navigation, Autoplay]);

function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;
  const petImgs = postingInfo.contents.imageUrl;
  return (
    <>
      <div
        className={`${
          displayFlg ? '' : 'slide-show'
        } posting-detail-info h-92/100 w-4/12 -right-1/2 bg-white absolute overflow-scroll `}
      >
        <div className="img-slide">
          <Swiper
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            centeredSlides={true}
          >
            {petImgs.map((img: String, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${img}`}
                    alt="pet"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <ul>
          <li>
            連絡先:
            {postingInfo.user.MailAddress}
          </li>
          <li>
            名前:
            {postingInfo.PetName}
          </li>
          <li>
            性別:
            {postingInfo.PetSex}
          </li>
          <li>
            年齢:
            {postingInfo.PetAge}
          </li>
          <li>
            離れた日:
            {new Date(postingInfo.LostDate).toLocaleDateString()}
          </li>
          <li>
            特徴:
            {postingInfo.PetInfo}
          </li>
          <li>
            その他の情報:
            {postingInfo.Detail}
          </li>
        </ul>
      </div>
    </>
  );
}

export default DetailPage;
