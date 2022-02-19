import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { ReactComponent as EditMark } from '../images/edit_icon.svg';
import { ReactComponent as DeleteMark } from '../images/delete_icon.svg';
import { useState } from 'react';
import PasswordChkModal from './PasswordChkModal';

SwiperCore.use([Pagination]);

export interface DetailPageProps {
  name: string;
  value: string;
}

function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;
  const [showModal, setShowModal] = useState<Boolean>(false);
  const petImgs = postingInfo.contents.imageUrl;

  const TableRecord = (props: DetailPageProps) => {
    const { name, value } = props;
    return (
      <tr className="bg-white border-b hover:bg-gray-100">
        <td className="py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
          {name}
        </td>
        <td className="py-4 px-6 text-gray-600 whitespace-nowrap">{value}</td>
      </tr>
    );
  };

  const TextArea = (props: DetailPageProps) => {
    const { name, value } = props;
    return (
      <div className="my-6 2xl:my-12">
        <p className="text-3xl font-semibold px-8 py-2">{name}</p>
        <p className="text-gray-600 px-8 py-2 2xl:py-8 w-full break-words">
          {value}
        </p>
      </div>
    );
  };

  return (
    <>
      {showModal && (
        <PasswordChkModal isOpen={showModal} setShowModal={setShowModal} />
      )}
      <div
        className={`${
          displayFlg ? 'page-slide-show' : ''
        } posting-detail-info h-92/100 w-4/12 -right-1/2 bg-white absolute overflow-scroll p-10`}
      >
        {/* 更新画面、削除モーダルにすすめるように設定する */}
        <div className="icon-section flex justify-end items-center mb-8">
          <a href="#" onClick={() => setShowModal(true)}>
            <EditMark />
          </a>
          <a href="#">
            <DeleteMark />
          </a>
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
                    <TableRecord name="性別" value={postingInfo.PetSex} />
                    <TableRecord
                      name="年齢"
                      value={`${postingInfo.PetAge} 歳`}
                    />
                    <TableRecord
                      name="離れた日"
                      value={new Date(
                        postingInfo.LostDate,
                      ).toLocaleDateString()}
                    />
                    <TableRecord
                      name="連絡先"
                      value={postingInfo.user.MailAddress}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="pet-info-detail-section w-full">
          <TextArea name="特徴" value={postingInfo.PetInfo} />
          <TextArea name="その他の情報" value={postingInfo.Detail} />
        </div>
      </div>
    </>
  );
}

export default DetailPage;
