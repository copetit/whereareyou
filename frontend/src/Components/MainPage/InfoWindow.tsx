import { IPetInfoWindowProps } from '../../types/Interface';
import { ReactComponent as Arrow } from '../../images/btn_arrow_icon.svg';
import { Button } from '../Parts/Button';

export const PetInfoWindow = (props: Required<IPetInfoWindowProps>) => {
  const { setdisplayFlg, postingInfo } = props;
  return (
    <>
      <div className="mini-profile min-h-profileCard min-w-profileCard flex max-w-3xl max-h-96">
        <div className="img">
          <img
            className="object-cover w-full h-full relative -left-8 rounded-br-profileCard"
            src={`${process.env.REACT_APP_API_URL}/${postingInfo.contents.imageUrl[0]}`}
            alt="pet"
          />
        </div>
        <div className="profile-text py-4 pr-4 relatvie">
          <p className="font-semibold text-3xl mb-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {postingInfo.PetName}
          </p>
          <p className="h-3/5 overflow-scroll break-words">
            {postingInfo.PetInfo}
          </p>
          <Button
            classList="detail-page-btn"
            value={<Arrow />}
            onClick={() => {
              setdisplayFlg(true);
            }}
            btnColor="bg-yellow-400"
          />
        </div>
      </div>
      <p className="absolute bottom-3 right-3 text-gray-500">
        {new Date(postingInfo.LostDate).toLocaleDateString()}
      </p>
    </>
  );
};
