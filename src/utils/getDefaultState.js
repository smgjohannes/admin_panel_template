import { HttpClient } from './HttpClient';
import { Token } from './Token';
import { LoadingStatus } from '../constants';

const token = new Token();
const httpClient = new HttpClient(token);

export const getDefaultState = {
  httpClient,
  token,
  error: null,
  validationErrors: null,
  success: null,
  progress: 0,
  currentRequestId: undefined,
  loading: LoadingStatus.IDLE,
};
