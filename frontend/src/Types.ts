import { Dispatch, SetStateAction } from 'react';

export interface IGetLocations {
  id: number;
  lat: number;
  lng: number;
}

export interface IPasswordChkModal {
  isOpen: Boolean;
  setShowModal: Dispatch<SetStateAction<Boolean>>;
}
