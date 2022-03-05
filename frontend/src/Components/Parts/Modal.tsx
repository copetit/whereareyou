import { CancelButton } from './Button';
import { ReactComponent as BtnCancel } from '../../images/btn_cancel_icon.svg';
import { IModalProps } from '../../types/Interface';

export const Modal = (props: Required<IModalProps>) => {
  const { isOpen, setShowModal, children } = props;
  if (isOpen) {
    return (
      <>
        <div className="modal-bg w-full h-full bg-black absolute top-0 left-0 bg-opacity-90"></div>
        <div className="modal bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="flex flex-col justify-between h-auto relative bg-white w-full max-w-2xl rounded-lg shadow">
            <div className="absolute right-2 top-2">
              <CancelButton
                classList="p-1.5"
                value={<BtnCancel />}
                onClick={() => setShowModal(false)}
              />
            </div>
            {children}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
