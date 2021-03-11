import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token && token.access_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}