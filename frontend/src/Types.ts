import { Dispatch, SetStateAction } from 'react';

export interface IGetLocations {
  id: number;
  lat: number;
  lng: number;
}

export interface IPasswordChkModal {
  userId: string;
  isOpen: Boolean;
  setShowModal: Dispatch<SetStateAction<Boolean>>;
}
