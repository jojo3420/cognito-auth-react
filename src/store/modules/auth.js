import { Map, List, fromJS } from "immutable";
import * as api from "lib/api/api";
import { createAction, handleActions } from "redux-actions";
import { applyPenders } from "redux-pender";

// 1. Action Types

// 1-1. sign in
const SIGN_IN = "app/auth/SIGN_IN";
const SIGN_IN_INPUT_CHANGE = "app/auth/SIGN_IN_INPUT_CHANGE";
const SEND_PASSWORD_RESET_CODE = "app/auth/SEND_PASSWORD_RESET_CODE";
const SUBMIT_RESET_PASSWORD = "app/auth/SUBMIT_RESET_PASSWORD";
const CLEAR_SIGN_IN_FORM_FIELDS = "app/auth/CLEAR_SIGN_IN_FORM_FIELDS";

// 1.2 sign up
const SIGN_UP = "app/auth/SIGN_UP";
const SIGN_UP_INPUT_CHANGE = "app/auth/SIGN_UP_INPUT_CHANGE";
const CONFIRM_SIGN_UP = "app/auth/CONFIRM_SIGN_UP";
const RESEND_SIGN_UP_CODE = "app/auth/RESEND_SIGN_UP_CODE";
const CLEAR_SIGN_UP_FORM_FIELDS = "app/auth/CLEAR_SIGN_UP_FORM_FIELDS";
const GET_USER_BY_EMAIL = "app/auth/GET_USER_BY_EMAIL";
const REGISTER_OLD_USER = "app/auth/REGISTER_OLD_USER";
const LIST_USERS_BY_POOL = "app/auth/LIST_USERS_BY_POOL";

// 1.3 Sign out
const SIGN_OUT = "app/auth/SIGN_OUT";

// 2. ActionCreator
// Sign In
export const signIn = createAction(SIGN_IN, api.signIn);
export const signInInputChange = createAction(SIGN_IN_INPUT_CHANGE);
export const sendPasswordResetCode = createAction(
  SEND_PASSWORD_RESET_CODE,
  api.forgotPassword
);
export const submitResetPassword = createAction(
  SUBMIT_RESET_PASSWORD,
  api.forgotPasswordSubmit
);
export const clearSignInFormFields = createAction(CLEAR_SIGN_IN_FORM_FIELDS);

// Sign Up
export const signUp = createAction(SIGN_UP, api.signUp);
export const registerOldUser = createAction(REGISTER_OLD_USER, api.signUp);
export const signUpInputChange = createAction(SIGN_UP_INPUT_CHANGE);
export const confirmSignUp = createAction(CONFIRM_SIGN_UP, api.confirmSignUp);
export const resendSignUpCode = createAction(
  RESEND_SIGN_UP_CODE,
  api.resendSignUpCode
);
export const clearSignUpFormFields = createAction(CLEAR_SIGN_UP_FORM_FIELDS);
export const getUserByEmail = createAction(
  GET_USER_BY_EMAIL,
  api.getUserByEmail
);
export const listUsersByPool = createAction(
  LIST_USERS_BY_POOL,
  api.listUsersByPool
);

// sign out
export const signOut = createAction(SIGN_OUT, api.signOut);

// 3. state
const INITIAL_STATE = Map({
  common: Map({
    custom: "brand"
  }),
  signUp: Map({
    email: "",
    password: "",
    repeatPassword: "",
    brand: "",
    sns: "",
    serial: "",
    product: "",
    channel: "",
    countryCallingCode: "",
    phone: "",
    cognitoUser: null,
    userConfirmed: false,
    code: "",
    userSub: "",
    smsSend: false,
    errorCode: "",
    errorMessage: "",
    oldUser: null,
    alreadySignUp: false
  }),

  signIn: Map({
    email: "",
    password: "",
    newPassword: "",
    logged: false,
    cognitoUser: null,
    error: false,
    errorCode: "",
    errorMessage: "",
    code: "",
    sendCodeMode: false,
    changed: false // send code after changed value true
  }),
  userPool: Map({
    users: List([]),
    errorCode: "",
    errorMsg: ""
  })
});

// 4. reducer
const reducer = handleActions(
  {
    // Sign Up
    [SIGN_UP_INPUT_CHANGE]: (state, action) => {
      const { title, value } = action.payload;
      return state.setIn(["signUp", title], value);
    },
    // Sign In
    [SIGN_IN_INPUT_CHANGE]: (state, action) => {
      const { title, value } = action.payload;
      return state.setIn(["signIn", title], value);
    },
    [CLEAR_SIGN_UP_FORM_FIELDS]: (state, action) => {
      return state.set("signUp", INITIAL_STATE.get("signUp"));
    },
    [CLEAR_SIGN_IN_FORM_FIELDS]: (state, action) => {
      return state
        .setIn(["signIn", "password"], "")
        .setIn(["signIn", "newPassword"], "")
        .setIn(["signIn", "error"], false)
        .setIn(["signIn", "errorCode"], "")
        .setIn(["signIn", "errorMessage"], "")
        .setIn(["signIn", "code"], "")
        .setIn(["signIn", "sendCodeMode"], false)
        .setIn(["signIn", "changed"], false);
    }
  },
  INITIAL_STATE
);

// 5. Pender reducer
export default applyPenders(reducer, [
  {
    type: LIST_USERS_BY_POOL,
    onSuccess: (state, action) => {
      const { Users } = action.payload;
      return state.setIn(["userPool", "users"], fromJS(Users));
    },
    onFailure: (state, action) => {
      const { code, message } = action.payload;
      return state
        .setIn(["userPool", "code"], code)
        .setIn(["userPool", "errorMsg"], message);
    },
    onError: (state, action) => {
      const { code, message } = action.payload;
      return state
        .setIn(["userPool", "code"], code)
        .setIn(["userPool", "errorMsg"], message);
    }
  },
  {
    type: SIGN_IN,
    onSuccess: (state, action) => {
      const { payload: cognitoUser } = action;
      return state
        .setIn(["signIn", "logged"], true)
        .setIn(["signIn", "cognitoUser"], cognitoUser);
    },
    onPending: (state, action) => {
      return state;
    },
    onFailure: (state, action) => {
      const { code, message } = action.payload;
      return state
        .setIn(["signIn", "logged"], false)
        .setIn(["signIn", "error"], action.error)
        .setIn(["signIn", "errorCode"], code)
        .setIn(["signIn", "errorMessage"], message);
    },
    onError: (state, action) => {
      const { code, message } = action.payload;
      return state
        .setIn(["signIn", "logged"], false)
        .setIn(["signIn", "error"], action.error)
        .setIn(["signIn", "errorCode"], code)
        .setIn(["signIn", "errorMessage"], message);
    }
  },
  {
    type: SIGN_UP,
    onSuccess: (state, action) => {
      const { user, userConfirmed, userSub } = action.payload;
      return state
        .setIn(["signUp", "smsSend"], true)
        .setIn(["signUp", "cognitoUser"], user)
        .setIn(["signUp", "userConfirmed"], userConfirmed)
        .setIn(["signUp", "userSub"], userSub);
    },
    onError: (state, action) => {
      const { code, name, message } = action.payload;
      return state
        .setIn(["signUp", "errorCode"], code)
        .setIn(["signUp", "errorMessage"], message);
    },
    onFailure: (state, action) => {
      const { code, name, message } = action.payload;
      return state
        .setIn(["signUp", "errorCode"], code)
        .setIn(["signUp", "errorMessage"], message);
    }
  },
  {
    type: CONFIRM_SIGN_UP,
    onSuccess: (state, action) => {
      let { payload: SUCCESS } = action;
      const userConfirmed = SUCCESS ? true : false;
      return state.setIn(["signUp", "userConfirmed"], userConfirmed);
    },
    onError: (state, action) => {
      alert("CONFIRM_SIGN_UP onError: " + action.payload);
      return state;
    },
    onFailure: (state, action) => {
      alert("CONFIRM_SIGN_UP onFailure: " + action.payload);
      return state;
    }
  },
  {
    type: RESEND_SIGN_UP_CODE,
    onSuccess: (state, action) => {
      // console.log(action.payload);
      return state.setIn(["signUp", "smsSend"], true);
    },
    onError: (state, action) => {
      alert("onError: " + action.payload);
      return state;
    },
    onFailure: (state, action) => {
      alert("onFailure: " + action.payload);
      return state;
    }
  },
  {
    type: REGISTER_OLD_USER,
    onSuccess: (state, action) => {},
    onError: (state, action) => {},
    onFailure: (state, action) => {}
  },
  {
    type: SEND_PASSWORD_RESET_CODE,
    onSuccess: (state, action) => {
      return state.setIn(["signIn", "sendCodeMode"], true);
    },
    onFailure: (state, action) => {
      // alert('SEND_PASSWORD_RESET_CODE onFailure: ' + action.payload);
      return state;
    },
    onError: (state, action) => {
      // alert('SEND_PASSWORD_RESET_CODE onError: ' + action.payload);
      return state;
    }
  },
  {
    type: SUBMIT_RESET_PASSWORD,
    onSuccess: (state, action) => {
      return state.setIn(["signIn", "changed"], true);
    },
    onFailure: (state, action) => {
      // alert('SUBMIT_RESET_PASSWORD onFailure: ' + action.payload);
      return state;
    },
    onError: (state, action) => {
      // alert('SUBMIT_RESET_PASSWORD onError: ' + action.payload);
      return state;
    }
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
    }
  },
  {
    type: GET_USER_BY_EMAIL,
    onSuccess: (state, action) => {
      const { rows } = action.payload.data;
      return state
        .setIn(["signUp", "alreadySignUp"], rows.length > 0)
        .setIn(["signUp", "oldUser"], rows[0]);
    },
    onFailure: (state, action) => {
      // alert('GET_USER_BY_EMAIL onFailure: ' + action.payload);
      const { code, message } = action.payload;
      return state
        .setIn(["signUp", "errorCode"], code)
        .setIn(["signUp", "errorMessage"], message);
    },
    onError: (state, action) => {
      const { code, message } = action.payload;
      return state
        .setIn(["signUp", "errorCode"], code)
        .setIn(["signUp", "errorMessage"], message);
    }
  }
]);
