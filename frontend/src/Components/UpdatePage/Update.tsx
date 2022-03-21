import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { uploadFiles, getPostingById, updatePostingByID } from '../../Api';
import { nowDate, nowMonth, nowYear } from '../../utils/getTime';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IGetLocations } from '../../types/Interface';
import { ReactComponent as Camera } from '../../images/camera_icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Parts/Button';
import { AlertMessage } from '../Parts/AlertMessage';
import { Header } from '../Header';

const ALLOWED_IMG_SIZE: number = 10485760;

export function Update() {
  const userId = Number(useLocation().state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('不明');
  const [petAge, setPetAge] = useState('');
  const [petInfo, setPetInfo] = useState('');
  const [detail, setDetail] = useState('');
  const [lostDate, setLostDate] = useState<Date | null>(new Date());
  const [initialLocation, setInitialLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [mailladdress, setMailaddress] = useState('');
  const [fileOne, setFileOne] = useState<string | Blob>('');
  const [fileTwo, setFileTwo] = useState<string | Blob>('');
  const [fileThree, setFileThree] = useState<string | Blob>('');
  const [fileFour, setFileFour] = useState<string | Blob>('');
  const [fileFive, setFileFive] = useState<string | Blob>('');
  const [errorLocation, setErrorLocation] = useState<Boolean>(true);
  const [fileSizeError, setFileSizeError] = useState<Boolean>(false);
  const [postingInfo, setPostingInfo] = useState<any>();
  const [imgTextOne, SetImgTextOne] = useState<string>('');
  const [imgTextTwo, SetImgTextTwo] = useState<string>('');
  const [imgTextThree, SetImgTextThree] = useState<string>('');
  const [imgTextFour, SetImgTextFour] = useState<string>('');
  const [imgTextFive, SetImgTextFive] = useState<string>('');
  const reader = new FileReader();

  const changePetName = (event: any) => {
    setPetName(event.target.value);
  };
  const changePetSex = (event: any) => {
    setPetSex(event.target.value);
  };
  const changePetAge = (event: any) => {
    setPetAge(event.target.value);
  };
  const changePetInfo = (event: any) => {
    setPetInfo(event.target.value);
  };
  const changeDetail = (event: any) => {
    setDetail(event.target.value);
  };
  const changeMailaddress = (event: any) => {
    setMailaddress(event.target.value);
  };

  const fileOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget.files[0]?.size <= ALLOWED_IMG_SIZE
    ) {
      setFileSizeError(false);
      setFileOne(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextOne(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    } else {
      setFileSizeError(true);
    }
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget.files[0]?.size <= ALLOWED_IMG_SIZE
    ) {
      setFileSizeError(false);
      setFileTwo(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextTwo(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    } else {
      setFileSizeError(true);
    }
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget.files[0]?.size <= ALLOWED_IMG_SIZE
    ) {
      setFileThree(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextThree(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    } else {
      setFileSizeError(true);
    }
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget.files[0]?.size <= ALLOWED_IMG_SIZE
    ) {
      setFileFour(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextFour(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    } else {
      setFileSizeError(true);
    }
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.currentTarget.files &&
      event.currentTarget.files[0]?.size <= ALLOWED_IMG_SIZE
    ) {
      setFileFive(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextFive(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    } else {
      setFileSizeError(true);
    }
  };

  const containerStyle = {
    height: '100%',
  };

  const backBtnHandler = () => (document.location.href = '/wau/');

  async function getPosting(id: number) {
    try {
      const [response] = await getPostingById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async function onSubmit(e: any) {
    let data = new FormData();
    data.append('files', fileOne);
    data.append('files', fileTwo);
    data.append('files', fileThree);
    data.append('files', fileFour);
    data.append('files', fileFive);

    try {
      await uploadFiles(data)
        .then((res) => res.data['imageUrl'])
        .then((res) => {
          updatePostingByID(userId, {
            PetName: petName,
            PetSex: petSex,
            PetAge: parseInt(petAge),
            PetInfo: petInfo,
            Detail: detail,
            LostDate: lostDate,
            CreatedDate: `${nowYear}-${nowMonth}-${nowDate}`,
            UpdateDate: `${nowYear}-${nowMonth}-${nowDate}`,
            locationinfo: location,
            user: {
              MailAddress: mailladdress,
            },
            contents: {
              imageUrl: res,
            },
            id: userId,
          });
        })
        .then(() => (window.location.href = '/wau'));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userId
      ? getPosting(userId).then(async (res) => {
          const { lat, lng } = res.locationinfo;
          const imgsFullUrl: string[] = [];
          const imgsUrl = res.contents.imageUrl;
          imgsUrl.map((imgUrl: string) =>
            imgsFullUrl.push(`${process.env.REACT_APP_API_URL}/${imgUrl}`),
          );

          const urlToObject = async (url: any) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            return file;
          };

          if (imgsFullUrl[0]) {
            SetImgTextOne(imgsFullUrl[0]);
            setFileOne(await urlToObject(imgsFullUrl[0]));
          } else {
            SetImgTextOne('');
          }
          if (imgsFullUrl[1]) {
            SetImgTextTwo(imgsFullUrl[1]);
            setFileTwo(await urlToObject(imgsFullUrl[1]));
          } else {
            SetImgTextTwo('');
          }
          if (imgsFullUrl[2]) {
            SetImgTextThree(imgsFullUrl[2]);
            setFileThree(await urlToObject(imgsFullUrl[2]));
          } else {
            SetImgTextThree('');
          }
          if (imgsFullUrl[3]) {
            SetImgTextFour(imgsFullUrl[3]);
            setFileFour(await urlToObject(imgsFullUrl[3]));
          } else {
            SetImgTextFour('');
          }
          if (imgsFullUrl[4]) {
            SetImgTextFive(imgsFullUrl[4]);
            setFileFive(await urlToObject(imgsFullUrl[4]));
          } else {
            SetImgTextFive('');
          }
          setPetName(res.PetName);
          setPetSex(res.PetSex);
          setPetAge(res.PetAge);
          setPetInfo(res.PetInfo);
          setDetail(res.Detail);
          setLostDate(new Date(res.LostDate));
          setInitialLocation({ lat: Number(lat), lng: Number(lng) });
          setLocation({ lat: Number(lat), lng: Number(lng) });
          setMailaddress(res.user.MailAddress);
          setPostingInfo(res);
        })
      : navigate('/');
  }, [userId, navigate]);

  return (
    <>
      <Header />
      {postingInfo && (
        <div className="form-container flex justify-center">
          <form className="posting-form w-1/2 max-w-5xl bg-gray-50 my-10">
            <p className="section-title">ペットの情報</p>
            <div className="pet-info p-14">
              <div className="mb-10">
                <div className="flex flex-wrap justify-center mb-4">
                  <label className="petPhoto required">
                    <p>必須</p>
                    <Camera />
                    <input
                      {...register('fileOne', {
                        onChange: (event) => fileOneChange(event),
                      })}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                    ></input>
                    <img className="thumbnail" src={imgTextOne} alt="" />
                  </label>
                  <label className="petPhoto">
                    <Camera />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      onChange={(event) => fileTwoChange(event)}
                    ></input>
                    <img className="thumbnail" src={imgTextTwo} alt="" />
                  </label>
                  <label className="petPhoto">
                    <Camera />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      onChange={(event) => fileThreeChange(event)}
                    ></input>
                    <img className="thumbnail" src={imgTextThree} alt="" />
                  </label>
                  <label className="petPhoto">
                    <Camera />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      onChange={(event) => fileFourChange(event)}
                    ></input>
                    <img className="thumbnail" src={imgTextFour} alt="" />
                  </label>
                  <label className="petPhoto">
                    <Camera />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      onChange={(event) => fileFiveChange(event)}
                    ></input>
                    <img className="thumbnail" src={imgTextFive} alt="" />
                  </label>
                </div>
                {fileSizeError && (
                  <AlertMessage
                    msg="イメージは10MBまでアップロード可能です"
                    color="red"
                  />
                )}
                {errors.fileOne && (
                  <AlertMessage msg={errors.fileOne.message} color="red" />
                )}
                <AlertMessage
                  msg="ペットの画像は「JPG」「JPEG」「PNG」「GIF」
        のいずれかのファイル形式のみです"
                  color="blue"
                />
              </div>
              <label className="form-label w-1/2">
                <div className="flex items-center">
                  名前
                  <span className="required-tag">必須</span>
                </div>
                <input
                  className="text-input"
                  type="text"
                  {...register('PetName', {
                    required: 'ペットの名前を入力してください',
                    maxLength: {
                      value: 20,
                      message: 'ペットの名前は20文字まで入力可能です',
                    },
                    onChange: (event) => changePetName(event),
                  })}
                  value={petName}
                />
                {errors.PetName && (
                  <AlertMessage msg={errors.PetName.message} color="red" />
                )}
              </label>
              <label className="form-label w-1/2">
                <div className="flex items-center">
                  性別
                  <span className="required-tag">必須</span>
                </div>
                <select
                  className="select-input"
                  {...register('PetSex', {
                    onChange: (event) => changePetSex(event),
                  })}
                  value={petSex}
                >
                  <option value="不明">不明</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </label>
              <label className="form-label w-1/2">
                <div className="flex items-center">
                  年齢
                  <span className="required-tag">必須</span>
                </div>
                <input
                  className="text-input"
                  type="number"
                  {...register('PetAge', {
                    required: 'ペットの年齢を入力してください',
                    min: { value: 0, message: '0~100歳まで入力可能です' },
                    max: { value: 100, message: '0~100歳まで入力可能です' },
                    onChange: (event) => changePetAge(event),
                  })}
                  value={petAge}
                />
                {errors.PetAge && (
                  <AlertMessage msg={errors.PetAge.message} color="red" />
                )}
              </label>
              <label className="form-label">
                <div className="flex items-center">
                  特徴
                  <span className="required-tag">必須</span>
                </div>
                <textarea
                  className="text-input h-32"
                  {...register('PetInfo', {
                    required: 'ペットの特徴を入力してください',
                    maxLength: {
                      value: 255,
                      message: 'ペットの特徴は255文字まで入力可能です',
                    },
                    onChange: (event) => changePetInfo(event),
                  })}
                  value={petInfo}
                ></textarea>
                {errors.PetInfo && (
                  <AlertMessage msg={errors.PetInfo.message} color="red" />
                )}
              </label>
              <label className="form-label">
                その他の情報
                <textarea
                  className="text-input h-48"
                  {...register('Detail', {
                    maxLength: {
                      value: 255,
                      message: 'その他の情報は255文字まで入力可能です',
                    },
                    onChange: (event) => changeDetail(event),
                  })}
                  value={detail}
                ></textarea>
                {errors.Detail && (
                  <AlertMessage msg={errors.Detail.message} color="red" />
                )}
              </label>
              <label className="form-label w-1/2">
                <div className="flex items-center">
                  離れた日
                  <span className="required-tag">必須</span>
                </div>
                <DatePicker
                  className="text-input"
                  selected={lostDate}
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  onChange={(date: Date | null) => setLostDate(date)}
                />
              </label>
              <div className="posting-map w-full mb-7">
                <LoadScript
                  googleMapsApiKey={
                    process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'
                  }
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={initialLocation}
                    zoom={17}
                    onClick={(e) => {
                      setLocation(e.latLng!.toJSON());
                      setErrorLocation(false);
                    }}
                  >
                    {location && (
                      <Marker
                        position={{
                          lat: location.lat,
                          lng: location.lng,
                        }}
                      ></Marker>
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
              {errorLocation && (
                <AlertMessage
                  msg="離れた場所をクリックしてください"
                  color="blue"
                />
              )}
            </div>
            <p className="section-title">飼い主の情報</p>
            <div className="user-info p-14">
              <label className="form-label">
                <div className="flex items-center">
                  連絡先メールアドレス
                  <span className="required-tag">必須</span>
                </div>
                <input
                  className="text-input"
                  id="email"
                  type="email"
                  {...register('MailAddress', {
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: '正しいメールアドレスを入力してください',
                    },
                    onChange: (event) => changeMailaddress(event),
                  })}
                  value={mailladdress}
                />
                {errors.MailAddress && (
                  <AlertMessage msg={errors.MailAddress.message} color="red" />
                )}
              </label>
            </div>
            <Button
              classList="posting-btn"
              value="更新"
              onClick={handleSubmit(onSubmit)}
              btnColor="bg-yellow-400"
            />
            <Button
              classList="posting-btn"
              value="戻る"
              onClick={backBtnHandler}
              btnColor="bg-gray-200"
            />
          </form>
        </div>
      )}
    </>
  );
}
