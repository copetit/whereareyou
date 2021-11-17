import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

// 全てのローケーション情報を返す
export const getLocations = () =>
  api.get('/v1/wau/locations').then((response) => response.data);
