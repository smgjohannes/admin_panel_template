import axios from 'axios';
import config from '../config';
import { toast } from './toast';

const MAX_RETRY = 3;

const client = axios.create();

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 429 || error.response.status === 403)) {
      toast.error('Something went wrong');
    }

    if (
      error.response &&
      error.response.status &&
      error.response.status !== 412 &&
      error.response.status !== 422 &&
      error.response.status > 399 &&
      error.response.status < 500
    ) {
      toast.error(error.response.data.message || 'error_title');
    }

    if (error.response && error.response.status === 500) {
      toast.error('error_title');
    }

    if (error.response && error.response.status === 409) {
      toast.processing();
    }

    console.error(error);

    return Promise.reject(error);
  }
);

export class HttpClient {
  constructor(token) {
    this.token = token;
    this.baseURL = config.baseUrl;
  }

  getAxiosHeaders() {
    const language = localStorage.getItem('X-LOCALE');
    const headers = {};

    if (this.token.getAccessToken()) {
      headers.authorization = `Bearer ${this.token.getAccessToken()}`;
    }

    if (language) {
      headers['Accept-Language'] = language;
    }

    return headers;
  }

  async executeQuery(method, url, query, body, retryCount = 0) {
    if (retryCount > MAX_RETRY) {
      this.token.reset();
      throw new Error('MAX_RETRY_EXCEEDED');
    }

    try {
      const response = await client({
        baseURL: this.baseURL,
        url,
        method,
        params: query,
        data: body,
        headers: this.getAxiosHeaders(),
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  async get(url, query) {
    return this.executeQuery('get', url, query);
  }

  async post(url, body) {
    return this.executeQuery('post', url, {}, body);
  }

  async patch(url, body) {
    return this.executeQuery('patch', url, {}, body);
  }

  async put(url, body) {
    return this.executeQuery('put', url, {}, body);
  }

  async delete(url, body) {
    return this.executeQuery('delete', url, {}, body);
  }
}
