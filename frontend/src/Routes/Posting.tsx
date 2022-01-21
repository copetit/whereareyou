import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { uploadFiles, createPosting } from '../Api';
import { nowDate, nowMonth, nowYear } from '../utils/getTime';
import 'react-datepicker/dist/react-datepicker.css';

function Posting() {
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('男');
  const [petAge, setPetAge] = useState('');
  const [petInfo, setPetInfo] = useState('');
  const [detail, setDetail] = useState('');
  const [lostDate, setLostDate] = useState<Date | null>(new Date());
  const [address, setAddress] = useState('');
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

  const fileOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && setFileOne(event.currentTarget.files[0]);
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && setFileTwo(event.currentTarget.files[0]);
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && setFileThree(event.currentTarget.files[0]);
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && setFileFour(event.currentTarget.files[0]);
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && setFileFive(event.currentTarget.files[0]);
  };

  async function handleSubmit(e: any) {
    // TODO: 転移画面決めた後に消す
    e.preventDefault();

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
            // TODO: Map導入後修正
            locationinfo: {
              lat: 35.73805386139952,
              lng: 139.6538817110336,
            },
            user: {
              Password: password,
              MailAddress: mailladdress,
            },
            contents: {
              imageUrl: res,
              // TODO: Video導入後編集
              videoUrl: '',
            },
          }).then((res) => console.log(res));
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="w-1/2 max-w-lg m-3">
      <div>
        {/* Pet Info */}
        ペットの情報
        {/* 写真・ビデオー TODO; 別のAPIではなく、postingに含まれるようにする*/}
        <div>
          <input type="file" onChange={(event) => fileOneChange(event)}></input>
          <input type="file" onChange={(event) => fileTwoChange(event)}></input>
          <input
            type="file"
            onChange={(event) => fileThreeChange(event)}
          ></input>
          <input
            type="file"
            onChange={(event) => fileFourChange(event)}
          ></input>
          <input
            type="file"
            onChange={(event) => fileFiveChange(event)}
          ></input>
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
          {/* カレンダを入れる */}
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
        <label className="form-label">
          離れた場所（地図で選択）
          {/* TODO: 地図を入れる */}
          <input className="text-input" type="text" name="locationinfo" />
        </label>
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
      {/* submit */}
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
