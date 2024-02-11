import axios from 'axios';

export const API_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const getUrl = (relativeUrl) =>
  `${process.env.REACT_APP_BACKEND_URL}${relativeUrl}`;

export const performGetRequest = (
  relativeUrlPath,
  params = null,
  data = null
) => {
  return axios.get(getUrl(relativeUrlPath), { params, data });
};

export const performPostRequest = (
  relativeUrlPath,
  data = null,
  headers = null
) =>
  axios.post(getUrl(relativeUrlPath), data, headers ? { headers } : undefined);

export const performPutRequest = (
  relativeUrlPath,
  data = null,
  headers = null
) => axios.put(getUrl(relativeUrlPath), data, { headers });

export const performPatchRequest = (
  relativeUrlPath,
  data = null,
  headers = null
) =>
  axios.patch(getUrl(relativeUrlPath), data, headers ? { headers } : undefined);

export const performDeleteRequest = (
  relativeUrlPath,
  data = null,
  queryParams = null
) => axios.delete(getUrl(relativeUrlPath), { params: queryParams, data });
