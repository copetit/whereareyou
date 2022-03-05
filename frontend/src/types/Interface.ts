import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IGetLocations {
  id: number;
  lat: number;
  lng: number;
}

export interface IPasswordChkModalProps {
  isOpen: Boolean;
  setShowModal: Dispatch<SetStateAction<Boolean>>;
  userId: number;
  modalType: string;
  btnColor: string;
}

export interface IModalProps {
  isOpen: Boolean;
  setShowModal: Dispatch<SetStateAction<Boolean>>;
  children: ReactNode;
}

export interface IPetInfoWindowProps {
  setdisplayFlg: Dispatch<SetStateAction<Boolean>>;
  postingInfo: any;
}
