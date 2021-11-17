import axios from 'axios';

// TODO typesのファイルに分ける
export interface IGetLocations {
  lat: number;
  lng: number;
}

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const getLocations = () =>
  api.get('/v1/wau/locations').then((response) => response.data);
