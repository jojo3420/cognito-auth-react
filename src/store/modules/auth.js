import { Map } from 'immutable';
import * as api from 'lib/api/api';
import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';



// 1. Action Types

// 1-1. sign in
const SIGN_IN = 'app/auth/SIGN_IN';
const SIGN_IN_INPUT_CHANGE = 'app/auth/SIGN_IN_INPUT_CHANGE';
const SEND_PASSWORD_RESET_CODE = 'app/auth/SEND_PASSWORD_RESET_CODE';
const SUBMIT_RESET_PASSWORD = 'app/auth/SUBMIT_RESET_PASSWORD';
const CLEAR_SIGN_IN_FORM_FIELDS = 'app/auth/CLEAR_SIGN_IN_FORM_FIELDS';



// 1.2 sign up
const SIGN_UP = 'app/auth/SIGN_UP';
const SIGN_UP_INPUT_CHANGE = 'app/auth/SIGN_UP_INPUT_CHANGE';
const CONFIRM_SIGN_UP = 'app/auth/CONFIRM_SIGN_UP';
const RESEND_SIGN_UP_CODE = 'app/auth/RESEND_SIGN_UP_CODE';
const CLEAR_SIGN_UP_FORM_FIELDS = 'app/auth/CLEAR_SIGN_UP_FORM_FIELDS';
const GET_USER_BY_EMAIL = 'app/auth/GET_USER_BY_EMAIL';
const REGISTER_OLD_USER = 'app/auth/REGISTER_OLD_USER';
const USER_POOL_TEST = 'app/auth/USER_POOL_TEST';




// 1.3 Sign out
const SIGN_OUT = 'app/auth/SIGN_OUT';





// 2. ActionCreator
// Sign In
export const signIn = createAction(SIGN_IN, api.signIn);
export const signInInputChange = createAction(SIGN_IN_INPUT_CHANGE);
export const sendPasswordResetCode = createAction(SEND_PASSWORD_RESET_CODE, api.forgotPassword);
export const submitResetPassword = createAction(SUBMIT_RESET_PASSWORD, api.forgotPasswordSubmit);
export const clearSignInFormFields = createAction(CLEAR_SIGN_IN_FORM_FIELDS);



// Sign Up
export const signUp = createAction(SIGN_UP, api.signUp);
export const registerOldUser = createAction(REGISTER_OLD_USER, api.signUp);
export const signUpInputChange = createAction(SIGN_UP_INPUT_CHANGE);
export const confirmSignUp = createAction(CONFIRM_SIGN_UP, api.confirmSignUp);
export const resendSignUpCode = createAction(RESEND_SIGN_UP_CODE, api.resendSignUpCode);
export const clearSignUpFormFields = createAction(CLEAR_SIGN_UP_FORM_FIELDS);
export const getUserByEmail = createAction(GET_USER_BY_EMAIL, api.getUserByEmail);
export const userPoolTest = createAction(USER_POOL_TEST, api.userPoolTest);



// sign out
export const signOut = createAction(SIGN_OUT, api.signOut);





// 3. state
const INITIAL_STATE = Map({
  signUp: Map({
    email: '',
    password: '',
    repeatPassword: '',
    brand: '',
    sns: '',
    serial: '',
    product: '',
    channel: '',
    countryCallingCode: '',
    phone: '',
    cognitoUser: null,
    userConfirmed: false,
    code: '',
    userSub: '',
    smsSend: false,
    errorCode: '',
    errorMessage: '',
    oldUser: null,
    alreadySignUp: false,
    custom: 'brand',
  }),

  signIn: Map({
    email: '',
    password: '',
    newPassword: '',
    logged: false,
    cognitoUser: null,
    error: false,
    errorCode: '',
    errorMessage: '',
    code: '',
    sendCodeMode: false,
    changed: false,  // send code after changed value true
  })

});


// 4. reducer
const reducer = handleActions({
  [USER_POOL_TEST]: (state, action) => {
    debugger;
    return state;
  },
  // Sign Up
  [SIGN_UP_INPUT_CHANGE]: (state, action) => {
    const { title, value } = action.payload;
    return state.setIn(['signUp', title], value);
  },
  // Sign In
  [SIGN_IN_INPUT_CHANGE]: (state, action) => {
    const { title, value } = action.payload;
    return state.setIn(['signIn', title], value);
  },
  [CLEAR_SIGN_UP_FORM_FIELDS]: (state, action) => {
    return state.set('signUp', INITIAL_STATE.get('signUp'));

  },
  [CLEAR_SIGN_IN_FORM_FIELDS]: (state, action) => {
    return state.setIn(['signIn', 'password'], '')
      .setIn(['signIn', 'newPassword'], '')
      .setIn(['signIn', 'error'], false)
      .setIn(['signIn', 'errorCode'], '')
      .setIn(['signIn', 'errorMessage'], '')
      .setIn(['signIn', 'code'], '')
      .setIn(['signIn', 'sendCodeMode'], false)
      .setIn(['signIn', 'changed'], false);
  }

}, INITIAL_STATE);


// 5. Pender reducer
export default applyPenders(reducer, [
  {
    type: USER_POOL_TEST,
    onSuccess: (state, action) => {
      debugger
      return state;
    }
  },
  {
    type: SIGN_IN,
    onSuccess: (state, action) => {
      const { payload: cognitoUser } = action;
      return state.setIn(['signIn', 'logged'], true)
        .setIn(['signIn', 'cognitoUser'], cognitoUser);
    },
    onPending: (state, action) => {
      return state;
    },
    onFailure: (state, action) => {
      const { code, message } = action.payload;
      return state.setIn(['signIn', 'logged'], false)
        .setIn(['signIn', 'error'], action.error)
        .setIn(['signIn', 'errorCode'], code)
        .setIn(['signIn', 'errorMessage'], message);
    },
    onError: (state, action) => {
      alert(action.payload);
      return state.setIn(['signIn', 'logged'], false);
    }
    // try {
    //   const user = await Auth.signIn({
    //     username, password,
    //   });
    //   console.log('challengeName: ', user.challengeName);
    //   if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
    //     // 멀티 팩터 인증(MFA)
    //     // 1. SMS_MFA => 사용자는 SMS 메시지에서 받은 코드를 입력해야합니다.
    //     // 2. SOFTWARE_TOKEN_MFA => 사용자는 OTP (일회성 비밀번호)를 입력해야합니다.
    //     alert('멀티 팩터 인증이 준비중입니다.');
    //     return;
    //   } else if (user.challengeName === 'MFA_SETUP') {
    //     // 이것은 MFA 방법이 TOTP (일회성 비밀번호) 인 경우에 발생하며,
    //     // 사용자가 해당 비밀번호를 생성하기 위해 몇 가지 단계를 수행해야 합니다.
    //     // MFA 파트 확인 필요.
    //     alert('MFA_SETUP 멀티 팩터 인증은 준비중 입니다.');
    //   } else {
    //     // The user directly signs in
    //     console.log('The user directly signs in');
    //     console.log({user});
    //     return user;
    //   }
    //
    // } catch (err) {
    //   if (err.code === 'UserNotConfirmedException') {
    //     // The error happens if the user didn't finish the confirmation step when signing up
    //     // In this case you need to resend the code and confirm the user
    //     // About how to resend the code and confirm the user, please check the signUp part
    //   } else if (err.code === 'PasswordResetRequiredException') {
    //     // The error happens when the password is reset in the Cognito console
    //     // In this case you need to call forgotPassword to reset the password
    //     // Please check the Forgot Password part.
    //     alert(err.message);
    //   } else if (err.code === 'NotAuthorizedException') {
    //     // The error happens when the incorrect password is provided
    //     alert(err.message);
    //   } else if (err.code === 'UserNotFoundException') {
    //     // The error happens when the supplied username/email does not exist in the Cognito user pool
    //     alert('회원 정보를 찾을 수 없습니다.');
    //   } else {
    //     console.log(err);
    //     alert(err.message);
    //   }
    // }

  },
  {
    type: SIGN_UP,
    onSuccess: (state, action) => {
      const { user, userConfirmed, userSub } = action.payload;
      return state.setIn(['signUp', 'smsSend'], true)
        .setIn(['signUp', 'cognitoUser'], user)
        .setIn(['signUp', 'userConfirmed'], userConfirmed)
        .setIn(['signUp', 'userSub'], userSub);
    },
    onError: (state, action) => {
      // alert('onSuccess onError: ' + action.payload);
      return state;
    },
    onFailure: (state, action) => {
      const { code, name, message } = action.payload;
      return state.setIn(['signUp', 'errorCode'], code)
        .setIn(['signUp', 'errorMessage'], message);
      /*
        // .then(data => {
        //   console.log('data : ', data);
        //   alert("인증번호 발송 성공.");
        //   return data;
        // })
        // .catch(err => {
        //   if (err.code === "UsernameExistsException") {
        //     console.log('err =>', err);
        //     alert("사용자가 이미 존재 합니다.");
        //   } else {
        //     console.log("err", err);
        //     alert('기타 에러: ' + err.code);
        //   }
        // });
       */
    }
  },
  {
    type: CONFIRM_SIGN_UP,
    onSuccess: (state, action) => {
      let { payload: SUCCESS } = action;
      const userConfirmed  = SUCCESS ? true : false;
      return state.setIn(['signUp', 'userConfirmed'], userConfirmed);
    },
    onError: (state, action) => {
      alert('CONFIRM_SIGN_UP onError: ' + action.payload);
      return state;
    },
    onFailure: (state, action) => {
      alert('CONFIRM_SIGN_UP onFailure: ' + action.payload);
      return state;
    },
  },
  {
    type: RESEND_SIGN_UP_CODE,
    onSuccess: (state, action) => {
      // console.log(action.payload);
      return state.setIn(['signUp', 'smsSend'], true);
    },
    onError: (state, action) => {
      alert('onError: ' + action.payload);
      return state;
    },
    onFailure: (state, action) => {
      alert('onFailure: ' + action.payload);
      return state;
    },
  },
  {
    type: REGISTER_OLD_USER,
    onSuccess: (state, action) => {

    },
    onError: (state, action) => {

    },
    onFailure: (state, action) => {

    }
  },
  {
    type: SEND_PASSWORD_RESET_CODE,
    onSuccess: (state, action) => {
      return state.setIn(['signIn', 'sendCodeMode'], true);
    },
    onFailure: (state, action) => {
      // alert('SEND_PASSWORD_RESET_CODE onFailure: ' + action.payload);
      return state;
    },
    onError: (state, action) => {
      // alert('SEND_PASSWORD_RESET_CODE onError: ' + action.payload);
      return state;
    },
  },
  {
    type: SUBMIT_RESET_PASSWORD,
    onSuccess: (state, action) => {
      return state.setIn(['signIn', 'changed'], true);
    },
    onFailure: (state, action) => {
      // alert('SUBMIT_RESET_PASSWORD onFailure: ' + action.payload);
      return state;
    },
    onError: (state, action) => {
      // alert('SUBMIT_RESET_PASSWORD onError: ' + action.payload);
      return state;
    },
  },
  {
    type: SIGN_OUT,
    onSuccess: (state, action) => {
      return INITIAL_STATE;
    },
    onFailure: (state, action) => {
      // alert('SIGN_OUT onFailure: ' + action.payload);
      return state;
    },
    onError: (state, action) => {
      // alert('SIGN_OUT onError: ' + action.payload);
      return state;
    },
  },
  {
    type: GET_USER_BY_EMAIL,
    onSuccess: (state, action) => {
      const { rows } = action.payload.data;
      return state.setIn(['signUp', 'alreadySignUp'], rows.length > 0)
        .setIn(['signUp', 'oldUser'], rows[0]);
    },
    onFailure: (state, action) => {
      // alert('GET_USER_BY_EMAIL onFailure: ' + action.payload);
      const { code, message } = action.payload;
      return state.setIn(['signUp', 'errorCode'], code)
        .setIn(['signUp', 'errorMessage'], message);
    },
    onError: (state, action) => {
      const { code, message } = action.payload;
      return state.setIn(['signUp', 'errorCode'], code)
        .setIn(['signUp', 'errorMessage'], message);
    },
  }
]);

