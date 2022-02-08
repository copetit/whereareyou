import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { uploadFiles, createPosting } from '../Api';
import { nowDate, nowMonth, nowYear } from '../utils/getTime';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IGetLocations } from '../Types';
import { ReactComponent as Camera } from '../camera.svg';
import 'react-datepicker/dist/react-datepicker.css';

function Posting() {
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
    if (event.currentTarget.files) {
      setFileOne(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextOne(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileTwo(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextTwo(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileThree(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextThree(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileFour(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextFour(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileFive(event.currentTarget.files[0]);
      reader.onload = (e: any) => {
        SetImgTextFive(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
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

  async function handleSubmit(e: any) {
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
          <div className="flex flex-wrap justify-center mb-10">
            <label className="petPhoto required">
              <p>必須</p>
              <Camera />
              <input
                type="file"
                onChange={(event) => fileOneChange(event)}
              ></input>
              <img className="thumbnail" src={imgTextOne} alt="" />
            </label>
            <label className="petPhoto">
              <Camera />
              <input
                type="file"
                onChange={(event) => fileTwoChange(event)}
              ></input>
              <img className="thumbnail" src={imgTextTwo} alt="" />
            </label>
            <label className="petPhoto">
              <Camera />
              <input
                type="file"
                onChange={(event) => fileThreeChange(event)}
              ></input>
              <img className="thumbnail" src={imgTextThree} alt="" />
            </label>
            <label className="petPhoto">
              <Camera />
              <input
                type="file"
                onChange={(event) => fileFourChange(event)}
              ></input>
              <img className="thumbnail" src={imgTextFour} alt="" />
            </label>
            <label className="petPhoto">
              <Camera />
              <input
                type="file"
                onChange={(event) => fileFiveChange(event)}
              ></input>
              <img className="thumbnail" src={imgTextFive} alt="" />
            </label>
          </div>
          <label className="form-label w-1/2">
            名前
            <input
              className="text-input"
              type="text"
              name="PetName"
              value={petName}
              onChange={changePetName}
            />
          </label>
          <label className="form-label w-1/2">
            性別
            <select
              className="select-input"
              value={petSex}
              onChange={changePetSex}
            >
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="不明">不明</option>
            </select>
          </label>
          <label className="form-label w-1/2">
            年齢
            {/* TODO: MAX 制限必要 */}
            <input
              className="text-input"
              type="number"
              name="PetAge"
              value={petAge}
              onChange={changePetAge}
            />
          </label>
          <label className="form-label">
            特徴
            <textarea
              className="text-input h-32"
              name="PetInfo"
              value={petInfo}
              onChange={changePetInfo}
            ></textarea>
          </label>
          <label className="form-label">
            その他の情報
            <textarea
              className="text-input h-48"
              name="Detail"
              value={detail}
              onChange={changeDetail}
            ></textarea>
          </label>
          <label className="form-label w-1/2">
            離れた日
            <DatePicker
              className="text-input"
              selected={lostDate}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              onChange={(date: Date | null) => setLostDate(date)}
            />
          </label>
          <label className="form-label">
            離れた場所
            <input
              className="text-input"
              type="text"
              name="Address"
              value={address}
              onChange={changeAddress}
            />
          </label>
          <div className="posting-map w-full">
            <LoadScript
              googleMapsApiKey={
                process.env.REACT_APP_GOOGLE_MAP_API_KEY || 'dummy'
              }
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation}
                zoom={17}
                onClick={(e) => setLocation(e.latLng!.toJSON())}
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
        </div>
        <p className="section-title">飼い主の情報</p>
        <div className="user-info p-14">
          <label className="form-label">
            メールアドレス
            <input
              className="text-input"
              id="email"
              type="email"
              name="MailAddress"
              value={mailladdress}
              onChange={changeMailaddress}
            />
          </label>
          <label className="form-label">
            パスワード
            <input
              className="text-input"
              type="password"
              id="password"
              name="Password"
              value={password}
              onChange={changePassword}
            />
          </label>
        </div>
        <input
          className="posting-btn flex justify-center text-black hover:text-white bg-yellow-400 hover:bg-black rounded-3xl w-1/2 px-6 py-5 mt-10 mb-10 transition ease-in duration-100 cursor-pointer"
          type="button"
          value="登録"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
}

export default Posting;
