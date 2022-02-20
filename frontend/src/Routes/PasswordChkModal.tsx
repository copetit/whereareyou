import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { canActivate } from '../Api';
import { IPasswordChkModal } from '../Types';
import { ReactComponent as BtnCancel } from '../btn_cancel.svg';
import { ReactComponent as LockMark } from '../lock_mark.svg';

function PasswordChkModal(props: Required<IPasswordChkModal>) {
  const { isOpen, setShowModal, userId } = props;
  const [inputPW, setInputPW] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(e: any) {
    try {
      const { data: result } = await canActivate({ id: userId, inputPW });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const changePassword = (event: any) => {
    setInputPW(event.target.value);
  };

  if (isOpen) {
    return (
      <>
        <div className="modal-bg w-full h-full bg-black absolute top-0 left-0 bg-opacity-90"></div>
        <div className="modal bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="flex flex-col justify-between h-96 relative bg-white w-full max-w-2xl rounded-lg shadow">
            <div className="absolute right-2 top-2">
              <button
                type="button"
                className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="authentication-modal"
                onClick={() => setShowModal(false)}
              >
                <BtnCancel />
              </button>
            </div>
            <form
              className="flex flex-col h-full px-10 py-8 space-y-5 xl:pb-8"
              action="#"
            >
              <div className="flex w-full justify-center h-1/4 mb-2">
                <LockMark />
              </div>
              <h3 className="font-medium text-gray-900 text-center">
                登録時のパスワードを入力してください
              </h3>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register('password', {
                  required: 'パスワードを入力してください',
                  onChange: (event) => changePassword(event),
                })}
              />

              <button
                type="button"
                className="modal-btn w-full bg-yellow-400 hover:text-white hover:bg-black font-medium rounded-lg px-5 py-5 text-center transition ease-in duration-100 cursor-pointer"
                onClick={(e) => handleSubmit(onSubmit)()}
              >
                修正
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default PasswordChkModal;
