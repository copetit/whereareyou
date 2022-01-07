import { useState } from 'react';
import { uploadFiles } from '../Api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Posting() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  let fileOne: File;
  let fileTwo: File;
  let fileThree: File;
  let fileFour: File;
  let fileFive: File;

  const fileOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileOne = event.currentTarget.files[0]);
  };
  const fileTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileTwo = event.currentTarget.files[0]);
  };
  const fileThreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileThree = event.currentTarget.files[0]);
  };
  const fileFourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileFour = event.currentTarget.files[0]);
  };
  const fileFiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.files && (fileFive = event.currentTarget.files[0]);
  };

  async function submitFiles() {
    let data = new FormData();
    data.append('files', fileOne);
    data.append('files', fileTwo);
    data.append('files', fileThree);
    data.append('files', fileFour);
    data.append('files', fileFive);

    try {
      const imageUrl = await uploadFiles(data).then(
        (res) => res.data['imageUrl'],
      );
      // TODO imageUrlをCreatePostingに入れる
      //
      console.log(imageUrl);
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
          <input className="text-input" type="text" name="PetName" />
        </label>
        <label className="form-label w-1/2">
          性別
          <select className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="不明">不明</option>
          </select>
        </label>
        <label className="form-label w-1/2">
          年齢
          <input className="text-input" type="text" name="PetAge" />
        </label>
        <label className="form-label">
          特徴
          <textarea className="text-input h-32" name="PetInfo"></textarea>
        </label>
        <label className="form-label">
          その他の情報
          <textarea className="text-input h-48" name="Detail"></textarea>
        </label>
        <label className="form-label w-1/2">
          離れた日
          {/* カレンダを入れる */}
          <DatePicker
            className="text-input"
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            onChange={(date: Date | null) => setStartDate(date)}
          />
        </label>
        <label className="form-label">
          離れた場所
          <input className="text-input" type="text" name="Address" />
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
        />
      </label>
      <label className="form-label">
        パスワード
        <input
          className="text-input"
          type="password"
          id="password"
          name="Password"
        />
      </label>
      {/* submit */}
      <input
        className="btn btn-blue"
        type="submit"
        value="Submit"
        onClick={() => submitFiles()}
      />
    </form>
  );
}

export default Posting;
