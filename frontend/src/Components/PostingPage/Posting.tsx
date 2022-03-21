import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { uploadFiles, createPosting } from '../../Api';
import { nowDate, nowMonth, nowYear } from '../../utils/getTime';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IGetLocations } from '../../types/Interface';
import { ReactComponent as Camera } from '../../images/camera_icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Parts/Button';
import { AlertMessage } from '../Parts/AlertMessage';
import { Header } from '../Header';

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
  const [currentLocation, setCurrentLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [location, setLocation] =
    useState<Pick<IGetLocations, 'lat' | 'lng'>>();
  const [mailladdress, setMailaddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorLocation, setErrorLocation] = useState<Boolean>(true);
  const [fileSizeError, setFileSizeError] = useState<Boolean>(false);
  const [fileNumError, setFileNumError] = useState<Boolean>(false);

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
  const changePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const reader = new FileReader();

  const containerStyle = {
    height: '100%',
  };

  async function getGeoLocation() {
    if (navigator.geolocation) {
      // TODO 位置情報許可の窓が表示されるタイミングなので、Loading中だと表示させる
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setCurrentLocation({
            lat: 35.68183,
            lng: 139.76728,
          });
        },
      );
    }
  }

  async function onSubmit(e: any) {
    let data = new FormData();

    imgFiles.forEach((imgFile: any) => {
      data.append('files', imgFile);
    });

    try {
      await uploadFiles(data)
        .then((res) => res.data['imageUrl'])
        .then(async (res) => {
          await createPosting({
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
              Password: password,
              MailAddress: mailladdress,
            },
            contents: {
              imageUrl: res,
              // TODO: Video導入後編集
              videoUrl: '',
            },
          }).then(() => {
            window.location.href = '/wau';
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  const [imgFiles, setImgFiles] = useState<any>([]);
  const [imgBlobs, setImgBlobs] = useState<any>([]);
  const [imgTexts, setImgTexts] = useState<any>([]);

  const inputRef = useRef<any>(null);
  const fileUpload = () => {
    console.log('ref');
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileInputChange');
    console.log(imgFiles.length);

    if (event.target.files && event.target.files[0]?.size <= ALLOWED_IMG_SIZE) {
      if (imgFiles.length <= 4) {
        setFileSizeError(false);
        setFileNumError(false);
        let nowImgs = [...imgFiles];
        nowImgs.push(event.target.files[0]);
        setImgFiles(nowImgs);
        // reader.onload = (e: any) => {
        //   let nowImgText = [...imgTexts];
        //   nowImgText.push(e.target.result);
        //   setImgTexts(nowImgText);
        // };
        let nowImgBlob = [...imgBlobs];
        nowImgBlob.push(URL.createObjectURL(event.target.files[0]));
        console.log(URL.createObjectURL(event.target.files[0]));

        setImgBlobs(nowImgBlob);
        reader.readAsDataURL(event.target.files[0]);
      } else {
        setFileNumError(true);
      }
    } else {
      setFileSizeError(true);
    }
  };
  useEffect(() => {
    getGeoLocation();
  }, []);

  return (
    <>
      <Header />
      <div className="form-container flex justify-center">
        <form className="posting-form w-1/2 max-w-5xl bg-gray-50 my-10">
          <p className="section-title">ペットの情報</p>
          <div className="pet-info p-14">
            <div className="mb-10">
              <div className="flex flex-wrap justify-center mb-4">
                {/* {imgBlobs.map((imgBlob: any, i: number) => {
                  return (
                    <label key={i} className="petPhoto required">
                      <img className="thumbnail" src={imgBlob} alt="" />
                    </label>
                  );
                })} */}
                <label className="petPhoto required">
                  <p>必須</p>
                  <Camera />
                  <img className="thumbnail" src={imgBlobs[0]} alt="" />
                </label>
                <label className="petPhoto">
                  <Camera />
                  <img className="thumbnail" src={imgBlobs[1]} alt="" />
                </label>
                <label className="petPhoto">
                  <Camera />
                  <img className="thumbnail" src={imgBlobs[2]} alt="" />
                </label>
                <label className="petPhoto">
                  <Camera />
                  <img className="thumbnail" src={imgBlobs[3]} alt="" />
                </label>
                <label className="petPhoto">
                  <Camera />
                  <img className="thumbnail" src={imgBlobs[4]} alt="" />
                </label>
              </div>
              {fileSizeError && (
                <AlertMessage
                  msg="イメージは10MBまでアップロード可能です"
                  color="red"
                />
              )}
              {fileNumError && (
                <AlertMessage
                  msg="イメージは5枚までアップロード可能です"
                  color="red"
                />
              )}
              {errors.file && (
                <AlertMessage msg={errors.file.message} color="red" />
              )}
              <AlertMessage
                msg="ペットの画像は「JPG」「JPEG」「PNG」「GIF」
          のいずれかのファイル形式のみです"
                color="blue"
              />
            </div>
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              onChange={onFileInputChange}
            />
            <button
              type="button"
              className="bg-yellow-500"
              onClick={fileUpload}
            >
              ファイルアップロード
            </button>
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
                // value={petInfo}
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
              />
              {errors.MailAddress && (
                <AlertMessage msg={errors.MailAddress.message} color="red" />
              )}
            </label>
            <label className="form-label">
              <div className="flex items-center">
                パスワード
                <span className="required-tag">必須</span>
              </div>
              <input
                id="password"
                type="password"
                className="text-input"
                autoComplete="new-password"
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
                <AlertMessage msg={errors.Password.message} color="red" />
              )}
              <AlertMessage
                msg="パスワードは記事を修正、削除するときに利用します"
                color="blue"
              />
            </label>
          </div>
          <Button
            classList="posting-btn"
            value="登録"
            onClick={handleSubmit(onSubmit)}
            btnColor="bg-yellow-400"
          />
        </form>
      </div>
    </>
  );
}

export default Posting;
