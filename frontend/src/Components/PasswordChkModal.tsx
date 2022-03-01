import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { canActivate } from '../Api';
import { IPasswordChkModalProps } from '../types/Interface';
import { ReactComponent as BtnCancel } from '../images/btn_cancel_icon.svg';
import { ReactComponent as LockMark } from '../images/lock_icon.svg';
import { Button, CancelButton } from './Button';
import { AlertMessage } from './AlertMessage';

function PasswordChkModal(props: Required<IPasswordChkModalProps>) {
  const { isOpen, setShowModal, userId, modalType, btnColor } = props;
  const [inputPW, setInputPW] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO 更新、削除処理
  async function onSubmit() {
    console.log('clicked btn');
  }

  async function checkPassword() {
    try {
      const { data: result } = await canActivate({ id: userId, inputPW });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const changePassword = (pw: string) => {
    setInputPW(pw);
  };

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
                className="text-input"
                {...register('password', {
                  required: 'パスワードを入力してください',
                  validate: {
                    checkPassword: async () =>
                      (await checkPassword()) || 'パスワードが一致しません',
                  },
                })}
                onChange={(e) => changePassword(e.target.value)}
              />
              {errors.password && (
                <AlertMessage msg={errors.password.message} color="red" />
              )}
              <Button
                classList="modal-btn mt-5"
                value={modalType}
                onClick={() => handleSubmit(onSubmit)()}
                btnColor={btnColor}
              />
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
