import { ReactComponent as Plus } from '../../images/btn_plus_icon.svg';

export interface IButtonProps {
  classList: string;
  value: any;
  onClick: any;
  btnColor: string;
}

export function PostingButton() {
  const clickHandler = () => (document.location.href = '/wau/posting');

  return (
    <div className="absolute h-24 w-24 2xl:h-32 2xl:w-32 bottom-24 left-10">
      <Button
        classList="shadow-btn p-0 w-full h-full rounded-full"
        value={<Plus />}
        onClick={clickHandler}
        btnColor="bg-yellow-400"
      />
    </div>
  );
}

export function Button(props: IButtonProps) {
  const { classList, value, onClick, btnColor } = props;
  return (
    <button
      type="button"
      className={`hover:bg-black text-black hover:text-white rounded-lg transition ease-in duration-100 cursor-pointer ${classList} ${btnColor}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
export function CancelButton(props: IButtonProps) {
  const { classList, value, onClick, btnColor } = props;

  return (
    <button
      type="button"
      className={`rounded-lg ${classList} ${btnColor} `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
