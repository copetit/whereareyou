import { ReactComponent as EditMark } from '../../images/edit_icon.svg';
import { ReactComponent as DeleteMark } from '../../images/delete_icon.svg';
import { useState } from 'react';
import PasswordChkModal from '../PasswordChkModal';
import { PetImgSlide } from './PetImgSlide';

export interface DetailPageProps {
  name: string;
  value: string;
}

function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [btnColor, setbtnColor] = useState<string>('');
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

  const setStatesModal = (type: string, btnColor: string) => {
    setShowModal(true);
    setModalType(type);
    setbtnColor(btnColor);
  };

  return (
    <>
      {showModal && (
        <PasswordChkModal
          isOpen={showModal}
          setShowModal={setShowModal}
          userId={postingInfo.id}
          modalType={modalType}
          btnColor={btnColor}
        />
      )}
      <div
        className={`${
          displayFlg ? 'page-slide-show' : ''
        } posting-detail-info h-94/100 w-4/12 -right-1/2 bg-white absolute overflow-scroll p-10`}
      >
        {/* 更新画面、削除モーダルにすすめるように設定する */}
        <div className="icon-section flex justify-end items-center mb-8">
          <a href="#!" onClick={() => setStatesModal('修正', 'bg-yellow-400')}>
            <EditMark />
          </a>
          <a href="#!" onClick={() => setStatesModal('削除', 'bg-red-500')}>
            <DeleteMark />
          </a>
        </div>
        <PetImgSlide petImgs={petImgs} />
        <div className="pet-info-section flex flex-col mx-auto">
          <div className="flex justify-center items-center flex-wrap mb-8">
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
          <div className="pet-detail-info border-l border-r border-solid divide-gray-400">
            <TextArea name="特徴" value={postingInfo.PetInfo} />
            <TextArea name="その他の情報" value={postingInfo.Detail} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
