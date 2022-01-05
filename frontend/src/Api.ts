import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

// 全てのローケーション情報を返す
export const getLocations = () =>
  api.get('/wau/v1/locations').then((response) => response.data);
// uploadファイル用のHeader
const headers = { 'content-type': 'multipart/form-data' };
// Upload files
export const uploadFiles = (data: FormData) =>
  api.post('/wau/uploads', data, { headers });
