import React from 'react';
import AddPosting from './AddPosting';

function Posting() {
  return (
    <form className="w-1/2 max-w-lg m-3">
      <div>
        {/* Pet Info */}
        ペットの情報
        {/* 写真・ビデオー */}
        <AddPosting />
        <label className="form-label">
          名前
          <input className="text-input" type="text" name="PetName" />
        </label>
        <label className="form-label">
          性別
          <select className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="不明">不明</option>
          </select>
        </label>
        <label className="form-label">
          年齢
          <input className="text-input" type="text" name="PetAge" />
        </label>
        <label className="form-label">
          特徴
          <input className="text-input" type="text" name="PetInfo" />
        </label>
        <label className="form-label">
          その他の情報
          <textarea className="text-input h-48" name="Detail"></textarea>
        </label>
        <label className="form-label">
          離れた日
          {/* カレンダを入れる */}
          <input className="text-input" type="text" name="LostDate" />
        </label>
        <label className="form-label">
          離れた場所
          <input className="text-input" type="text" name="Address" />
        </label>
        <label className="form-label">
          離れた場所（地図で選択）
          {/* 地図を入れる */}
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
      <input className="btn btn-blue" type="submit" value="Submit" />
    </form>
  );
}

export default Posting;
