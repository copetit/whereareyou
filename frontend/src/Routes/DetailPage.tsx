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
        <div className="icon-section flex justify-end items-center mb-8">
          <div className="delete-icon">
            <svg
              className="w-8 h-8 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#374151"
            >
              <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
            </svg>
          </div>
          <div className="delete-icon">
            <svg
              className=" w-8 h-8 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="crimson"
            >
              <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
            </svg>
          </div>
        </div>
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
          <div className="pet-name break-words">
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
