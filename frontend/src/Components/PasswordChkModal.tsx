import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { canActivate, deletePostingById } from '../Api';
import { IPasswordChkModalProps } from '../types/Interface';
import { ReactComponent as LockMark } from '../images/lock_icon.svg';
import { Button } from './Parts/Button';
import { AlertMessage } from './Parts/AlertMessage';
import { Modal } from './Parts/Modal';

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
    const canActivate = await checkPassword();
    // 削除ケース
    canActivate &&
      modalType === '削除' &&
      (await deletePostingById(userId)
        .then(() => (window.location.href = '/wau'))
        .catch((err) => console.log(`Can't Delte Posting: ${err}`)));

    // 修正ケース
    canActivate && modalType === '修正' && console.log('Not Yet');
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

  return (
    <Modal
      isOpen={isOpen}
      setShowModal={setShowModal}
      classList="max-w-2xl w-full"
    >
      <form
        className="flex flex-col h-full px-10 py-8 space-y-5 xl:pb-8"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
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
                (await checkPassword()) || '登録したパスワードと一致しません',
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
    </Modal>
  );
}

export default PasswordChkModal;
