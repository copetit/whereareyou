function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;

  return (
    <>
      <div
        className={`${
          displayFlg ? 'show' : ''
        } posting-detail-info h-full w-6/12`}
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/${postingInfo.contents.imageUrl[0]}`}
          alt="pet"
        />
        <ul>
          <li>
            名前:
            {postingInfo.PetName}
          </li>
          <li>
            性別:
            {postingInfo.PetSex}
          </li>
          <li>
            年齢:
            {postingInfo.PetAge}
          </li>
          <li>
            特徴:
            {postingInfo.PetInfo}
          </li>
          <li>
            その他の情報:
            {postingInfo.Detail}
          </li>
          <li>
            離れた日:
            {new Date(postingInfo.LostDate).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </>
  );
}

export default DetailPage;
