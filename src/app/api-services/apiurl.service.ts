import { environment } from '../../environments/environment';

export const APIURL = {
  // user authentication & authorization API URL's
  USER_LOGIN: environment.apiUrl + '/login',
  USER_SIGNUP: environment.apiUrl + '/signup',
  USER_RESIGNIN: environment.apiUrl + '/reSignIn',

  // sample API URL's
  GET_ALL_NOBEL_PRIZES: environment.apiUrl + '/get_nobel_prizes'
};
