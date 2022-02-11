import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Pagination]);

function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;
  const petImgs = postingInfo.contents.imageUrl;
  return (
    <>
      <div
        className={`${
          displayFlg ? 'page-slide-show' : ''
        } posting-detail-info h-92/100 w-4/12 -right-1/2 bg-white absolute overflow-scroll p-10`}
      >
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
        <div className="pet-info-section flex justify-center items-center flex-wrap mb-8">
          <div className="pet-name">
            <p className="text-5xl 2xl:text-6xl p-5">{postingInfo.PetName}</p>
          </div>
          <div className="m-5 overflow-x-auto">
            <div className="inline-block py-2 min-w-full px-8">
              <div className="overflow-hidden">
                <table className="table-fixed break-all">
                  <tbody>
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                        性別
                      </td>
                      <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                        {postingInfo.PetSex}
                      </td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                        年齢
                      </td>
                      <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                        {postingInfo.PetAge} 歳
                      </td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                        離れた日
                      </td>
                      <td className="py-4 px-6 text-gray-600 whitespace-nowrap ">
                        {new Date(postingInfo.LostDate).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                        連絡先
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {postingInfo.user.MailAddress}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="pet-info-detail-section w-full">
          <div className="pet-info my-6 2xl:my-12">
            <p className="text-3xl font-semibold px-8 py-2">特徴</p>
            <p className="text-gray-600 px-8 py-2 2xl:py-8 w-full break-words">
              {postingInfo.PetInfo}
            </p>
          </div>
          <div className="pet-detail my-6 xl:my-12">
            <p className="text-3xl font-semibold px-8 py-2">その他の情報</p>
            <p className="text-gray-600 px-8 py-2 2xl:py-8 w-full break-words">
              {postingInfo.Detail}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
