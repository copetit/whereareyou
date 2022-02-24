import { ReactComponent as Plus } from '../images/btn_plus_icon.svg';

export interface IButtonProps {
  classList: string;
  value: any;
  onClick: any;
  btnColor: string;
}

export function PostingButton() {
  const clickHandler = () => (document.location.href = '/wau/posting');

  return (
    <div className="absolute h-24 w-24 bottom-24 left-5">
      <Button
        classList="shadow-btn p-0 w-24 h-24 rounded-full"
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
export function CancelButton(props: Omit<IButtonProps, 'btnColor'>) {
  const { classList, value, onClick } = props;
  return (
    <button
      type="button"
      className={`text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg ${classList}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
