import { ReactComponent as Plus } from '../images/btn_plus_icon.svg';

function PostingButton() {
  // TODO hrefを使うよりいい方法はないかを調査
  const clickHandler = () => (document.location.href = '/wau/posting');

  return (
    <div className="absolute h-24 w-24 bottom-24 left-5">
      <button
        type="button"
        onClick={() => clickHandler()}
        className="p-0 w-24 h-24 bg-yellow-400 rounded-full hover:bg-black transition ease-in duration-200 focus:outline-none shadow-btn"
      >
        <Plus />
      </button>
    </div>
  );
}
export default PostingButton;
