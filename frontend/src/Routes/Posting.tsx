import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { uploadFiles, createPosting } from '../Api';
import { nowDate, nowMonth, nowYear } from '../utils/getTime';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { IGetLocations } from '../Types';
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

  // let fileOne: File;
  // let fileTwo: File;
  // let fileThree: File;
  // let fileFour: File;
  // let fileFive: File;
  const [imgvalue, SetImgValue] = useState('');
  const [imgvalue2, SetImgValue2] = useState('');
  const [imgvalue3, SetImgValue3] = useState('');
  const [imgvalue4, SetImgValue4] = useState('');
  const [imgvalue5, SetImgValue5] = useState('');

  const fileOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileOne(event.currentTarget.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        SetImgValue(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileTwo(event.currentTarget.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        SetImgValue2(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileThree(event.currentTarget.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        SetImgValue3(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileFour(event.currentTarget.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        SetImgValue4(e.target.result);
      };
      reader.readAsDataURL(event.currentTarget.files[0]);
    }
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileFive(event.currentTarget.files[0]);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        SetImgValue5(e.target.result);
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
            // TODO BUGFIX: issue #101
            CreatedDate: '2022-02-01',
            UpdateDate: '2022-02-01',
            // CreatedDate: `${nowYear}-${nowMonth}-${nowDate}`,
            // UpdateDate: `${nowYear}-${nowMonth}-${nowDate}`,
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
    <form className="w-1/2 max-w-lg m-3">
      <div>
        {/* Pet Info */}
        ペットの情報
        <div>
          <div>
            <input
              type="file"
              onChange={(event) => fileOneChange(event)}
            ></input>
            <img id="thumbnail" src={imgvalue} />
          </div>
          <div>
            <input
              type="file"
              onChange={(event) => fileTwoChange(event)}
            ></input>
            <img id="thumbnail" src={imgvalue2} />
          </div>
          <div>
            <input
              type="file"
              onChange={(event) => fileThreeChange(event)}
            ></input>
            <img id="thumbnail" src={imgvalue3} />
          </div>
          <div>
            <input
              type="file"
              onChange={(event) => fileFourChange(event)}
            ></input>
            <img id="thumbnail" src={imgvalue4} />
          </div>
          <div>
            <input
              type="file"
              onChange={(event) => fileFiveChange(event)}
            ></input>
            <img id="thumbnail" src={imgvalue5} />
          </div>
        </div>
        <label className="form-label">
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
            className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        離れた場所
        <div className="h-96 w-full">
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
      {/* user Info */}
      飼い主の情報
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
      <input
        className="btn btn-blue"
        type="button"
        value="submit"
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
}

export default Posting;
