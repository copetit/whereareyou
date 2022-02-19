import { ReactComponent as Plus } from '../images/btn_plus_icon.svg';

export interface IButtonProps {
  classList: string;
  value: any;
  onClick: any;
}

export function PostingButton() {
  const clickHandler = () => (document.location.href = '/wau/posting');

  return (
    <div className="absolute h-24 w-24 bottom-24 left-5">
      <Button
        classList="p-0 w-24 h-24 bg-yellow-400 rounded-full hover:bg-black transition ease-in duration-200 focus:outline-none shadow-btn"
        value={<Plus />}
        onClick={clickHandler}
      />
    </div>
  );
}

export function Button(props: IButtonProps) {
  const { classList, value, onClick } = props;
  return (
    <button type="button" className={classList} onClick={onClick}>
      {value}
    </button>
  );
}
export function CancelButton() {}
