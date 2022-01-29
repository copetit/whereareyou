import { Link } from 'react-router-dom';

function PostingButton() {
  return (
    <>
      <Link to="/posting">
        <div className="posting-btn">
          <button className="p-0 w-24 h-24 bg-yellow-400 rounded-full hover:bg-black transition ease-in duration-200 focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-12 h-12 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z"
              />
            </svg>
          </button>
        </div>
      </Link>
    </>
  );
}
export default PostingButton;
