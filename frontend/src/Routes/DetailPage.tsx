function DetailPage(props: any) {
  const { displayFlg, postingInfo } = props;
  const petImgs = postingInfo.contents.imageUrl;

  return (
    <>
      <div
        className={`${
          displayFlg ? 'slide-show' : ''
        } posting-detail-info h-full w-4/12 -right-1/2 bg-white absolute overflow-scroll `}
      >
        {petImgs.map((img: String) => {
          return (
            <img
              src={`${process.env.REACT_APP_API_URL}/${img}`}
              alt="pet"
              key={postingInfo.id}
            />
          );
        })}
        <ul>
          <li>
            連絡先:
            {postingInfo.user.MailAddress}
          </li>
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
            離れた日:
            {new Date(postingInfo.LostDate).toLocaleDateString()}
          </li>
          <li>
            特徴:
            {postingInfo.PetInfo}
          </li>
          <li>
            その他の情報:
            {postingInfo.Detail}
          </li>
        </ul>
      </div>
    </>
  );
}

export default DetailPage;
