import { environment } from '../../environments/environment';

export const APIURL = {
  // user authentication & authorization API URL's
  USER_LOGIN: environment.apiUrl + '/login',
  USER_SIGNUP: environment.apiUrl + '/signup',
  USER_RESIGNIN: environment.apiUrl + '/reSignIn',
  SEND_OTP_TO_USER_MAIL: environment.apiUrl + '/send_otp_to_mail',

  // sample API URL's
  GET_ALL_NOBEL_PRIZES: environment.apiUrl + '/get_nobel_prizes'
};
