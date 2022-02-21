import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const getLocations = () =>
  api.get('/wau/v1/locations').then((response) => response.data);

export const getPostingById = (id: Number) =>
  api.get(`/wau/v1/posting/${id}`).then((response) => response.data);

// uploadファイル用のHeader
let headers = { 'content-type': 'multipart/form-data' };
export const uploadFiles = (data: FormData) =>
  api.post('/wau/uploads', data, { headers });

const postHeader = { 'content-type': 'application/json' };
export const createPosting = (data: {}) =>
  api.post('/wau/v1/posting', data, { headers: postHeader });

export const canActivate = (data: {}) =>
  api.post('/wau/canActivate', data, { headers: postHeader });
