import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev.codeleap.co.uk/careers/',
});

// Interceptor to ensure all requests have a trailing slash
api.interceptors.request.use((config) => {
  if (config.url && !config.url.endsWith('/')) {
    config.url += '/';
  }
  return config;
});

export const getPosts = async (offset = 0) => {
  const response = await api.get('', { params: { offset, limit: 10 } });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post('', postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.patch(`${id}/`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`${id}/`);
  return response.data;
};

export default api;
