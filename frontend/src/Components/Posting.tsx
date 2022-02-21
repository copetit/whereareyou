import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { uploadFiles, createPosting } from '../Api';
import { nowDate, nowMonth, nowYear } from '../utils/getTime';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IGetLocations } from '../types/Interface';
import { ReactComponent as Camera } from '../images/camera_icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from './Button';
import { AlertMessage } from './AlertMessage';

const ALLOWED_IMG_SIZE: number = 10485760;

function Posting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('男');
  const [petAge, setPetAge] = useState('');
  const [petInfo, setPetInfo] = useState('');
  const [detail, setDetail] = useState('');
  const [lostDate, setLostDate] = useState<Date | null>(new Date());
  const [address, setAddress] = useState('');
  const [currentLocation, setCurrentLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [mailladdress, setMailaddress] = useState('');
  const [password, setPassword] = useState('');
  const [fileOne, setFileOne] = useState<string | Blob>('');
  const [fileTwo, setFileTwo] = useState<string | Blob>('');
  const [fileThree, setFileThree] = useState<string | Blob>('');
  const [fileFour, setFileFour] = useState<string | Blob>('');
  const [fileFive, setFileFive] = useState<string | Blob>('');
  const [errorLocation, setErrorLocation] = useState<Boolean>(true);
  const [fileSizeError, setFileSizeError] = useState<Boolean>(false);

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
  const changeAddress = (event: any) => {
    setAddress(event.target.value);
  };
  const changeMailaddress = (event: any) => {
    setMailaddress(event.target.value);
  };
  const changePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const [imgTextOne, SetImgTextOne] = useState<string>('');
  const [imgTextTwo, SetImgTextTwo] = useState<string>('');
  const [imgTextThree, SetImgTextThree] = useState<string>('');
  const [imgTextFour, SetImgTextFour] = useState<string>('');
  const [imgTextFive, SetImgTextFive] = useState<string>('');
  const reader = new FileReader();

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

  async function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
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
        .then(async (res) => {
          console.log(res);
          await createPosting({
            PetName: petName,
            PetSex: petSex,
            PetAge: parseInt(petAge),
            PetInfo: petInfo,
            Detail: detail,
            LostDate: lostDate,
            Address: address,
            CreatedDate: `${nowYear}-${nowMonth}-${nowDate}`,
            UpdateDate: `${nowYear}-${nowMonth}-${nowDate}`,
            locationinfo: location,
            user: {
              Password: password,
              MailAddress: mailladdress,
            },
            contents: {
              imageUrl: res,
              // TODO: Video導入後編集
              videoUrl: '',
            },
          })
            .then((res) => console.log(res))
            .then(() => {
              window.location.href = '/wau';
            });
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <div className="form-container flex justify-center">
      <form className="posting-form w-1/2 max-w-5xl bg-gray-50 ">
        <p className="section-title">ペットの情報</p>
        <div className="pet-info p-14">
          <div className="mb-10">
            <div className="flex flex-wrap justify-center mb-4">
              <label className="petPhoto required">
                <p>必須</p>
                <Camera />
                <input
                  {...register('fileOne', {
                    required: '写真1枚目は必須です',
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
                error={true}
              />
            )}
            {errors.fileOne && (
              <AlertMessage msg={errors.fileOne.message} error={true} />
            )}
            <AlertMessage
              msg="ペットの画像は「JPG」「JPEG」「PNG」「GIF」
          のいずれかのファイル形式のみです"
              error={false}
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
              // value={petName}
            />
            {errors.PetName && (
              <AlertMessage msg={errors.PetName.message} error={true} />
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
              <AlertMessage msg={errors.PetAge.message} error={true} />
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
              // value={petInfo}
            ></textarea>
            {errors.PetInfo && (
              <AlertMessage msg={errors.PetInfo.message} error={true} />
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
            ></textarea>
            {errors.Detail && (
              <AlertMessage msg={errors.Detail.message} error={true} />
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
          <label className="form-label">
            <div className="flex items-center">
              離れた場所
              <span className="required-tag">必須</span>
            </div>
            <input
              className="text-input"
              type="text"
              {...register('Address', {
                required: '離れた場所を入力してください',
                maxLength: {
                  value: 255,
                  message: '離れた場所は255文字まで入力可能です',
                },
                onChange: (event) => changeAddress(event),
              })}
              value={address}
            />
            {errors.Address && (
              <AlertMessage msg={errors.Address.message} error={true} />
            )}
          </label>
          <div className="posting-map w-full mb-7">
            <LoadScript
              googleMapsApiKey={
                process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'
              }
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation}
                zoom={17}
                onClick={(e) => {
                  setLocation(e.latLng!.toJSON());
                  setErrorLocation(false);
                }}
              >
                {location && (
                  <Marker
                    position={{
                      lat: Number(location.lat),
                      lng: Number(location.lng),
                    }}
                  ></Marker>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          {errorLocation && (
            <AlertMessage
              msg="離れた場所をクリックしてください"
              error={false}
            />
          )}
        </div>
        <p className="section-title">飼い主の情報</p>
        <div className="user-info p-14">
          <label className="form-label">
            <div className="flex items-center">
              メールアドレス
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
            />
            {errors.MailAddress && (
              <AlertMessage msg={errors.MailAddress.message} error={true} />
            )}
          </label>
          <label className="form-label">
            <div className="flex items-center">
              パスワード
              <span className="required-tag">必須</span>
            </div>
            <input
              className="text-input"
              type="password"
              id="password"
              {...register('Password', {
                required: 'パスワードを入力してください',
                maxLength: {
                  value: 32,
                  message: 'パスワードは32文字以下まで設定可能です',
                },
                minLength: {
                  value: 8,
                  message: 'パスワードは8文字以上から設定可能です',
                },
                onChange: (event) => changePassword(event),
              })}
            />
            {errors.Password && (
              <AlertMessage msg={errors.Password.message} error={true} />
            )}
          </label>
        </div>
        <Button
          classList="posting-btn flex justify-center text-black hover:text-white bg-yellow-400 hover:bg-black rounded-3xl w-1/2 px-6 py-5 mt-10 mb-10 transition ease-in duration-100 cursor-pointer"
          value="登録"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
}

export default Posting;
