import { Auth } from "aws-amplify";
import axios from "axios";
import { stringify } from "query-string";
import AWS from "aws-sdk";

// API
const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const API_SERVER = process.env.REACT_APP_API_SERVER;
const REQUEST_URL = `${PROXY_URL}${API_SERVER}`;

// AWS
const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const REGION = process.env.REACT_APP_REGION;
// console.log(USER_POOL_ID, ACCESS_KEY, SECRET_KEY);

const IAM = "USER_EMAIL_DATA";

export async function signIn({ email: username, password }) {
  // console.log({username, password});
  return await Auth.signIn({
    username,
    password
  });
}

export function signUp({
  email: username,
  password,
  brand = "",
  sns = "",
  serial = "",
  product = "",
  phoneNumber,
  channel
}) {
  return Auth.signUp({
    username,
    password,
    attributes: {
      "custom:brand": brand,
      "custom:sns": sns,
      "custom:serial": serial,
      "custom:product": product,
      "custom:chanel": channel,
      phone_number: phoneNumber // '+12128601234' 형식
    },
    validationData: [] //optional
  });
}

export function confirmSignUp({ username, code }) {
  // console.log({ username, code });
  // After retrieving the confirmation code from the user
  return Auth.confirmSignUp(username, code, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true
  });
}

export function resendSignUp({ user }) {
  return Auth.resendSignUp(user);
}

// sign up resend code
export function resendSignUpCode({ username }) {
  return Auth.resendSignUp(username);
}

// reset password to send code
export function forgotPassword({ username }) {
  return Auth.forgotPassword(username);
}

// submit reset password
export function forgotPasswordSubmit({
  username,
  code,
  newPassword: new_password
}) {
  // Collect confirmation code and new password, then
  return Auth.forgotPasswordSubmit(username, code, new_password);
}

export function signOut() {
  //  return Auth.signOut();
  // By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
  // which means the user is signed out from all the devices
  // Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
  return Auth.signOut({ global: true });
}

export function getUserByEmail({ email }) {
  const url = `${REQUEST_URL}/users/find?${stringify({ email })}`;
  return axios.get(url);
}

export function saveLocalStorage({ email }) {
  localStorage[IAM] = JSON.stringify({ email });
}

export function removeLocalStorage() {
  localStorage.clear();
}

export function readLocalStorage() {
  localStorage.getItem(IAM);
}
//
export function listUsersByPool() {
  const params = {
    UserPoolId: USER_POOL_ID /* required */
    // AttributesToGet: [
    //   'STRING_VALUE',
    //   /* more items */
    // ],
    // Filter: 'STRING_VALUE',
    // Limit: 'NUMBER_VALUE',
    // PaginationToken: 'STRING_VALUE'
  };

  return new Promise((resolve, reject) => {
    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY
    });
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    cognitoIdentityServiceProvider.listUsers(params, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // console.log("data", data);
        resolve(data);
        return data;
      }
    });
  });
}
