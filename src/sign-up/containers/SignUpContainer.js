import React, { Component } from 'react';
import SignUp from 'sign-up/components/SignUp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';



class SignUpContainer extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange({ title: 'channel' , value: navigator.userAgent.toString() });
  }

  findUserByEmail = async () => {
    const { email, AuthActions } = this.props;
    await AuthActions.getUserByEmail({ email });
  };

  handleClickSignUp = async () => {
    try {
      await this.findUserByEmail();
    }catch (e) {
      console.error(e);
    }
    const { alreadySignUp } = this.props;
    if (alreadySignUp) {
      this.signUpOldUser();
      return;
    }
    this.signUp();
  };


  //
  signUpOldUser = async () => {
    // eslint-disable-next-line no-restricted-globals
    const r = confirm('기존 회원정보가 있습니다. 기존 정보를 기반으로 가입하시겠습니까?');
    const { oldUser  } = this.props;
    this.handleInputChange({ title: 'brand', value: oldUser['Brand']});
    r && this.signUp();
  };

  signUp = async () => {
    const { AuthActions, history, email, password,
      channel, countryCallingCode, phone,
      brand, sns, serial, product } = this.props;
    try {
      await AuthActions.signUp({email, password, brand, sns, serial, product, channel, phoneNumber: `${countryCallingCode}${phone}` });
      history.push('/sign/up/confirm');
    } catch (e) {
      console.log(e);
    }
  };

  handleInputChange = ({ title, value }) => {
    const { AuthActions } = this.props;
    AuthActions.signUpInputChange({ title, value });
  };

  render() {
    const { handleClickSignUp, handleInputChange } = this;
    const { email, password, repeatPassword, brand, sns, serial, product,
      channel, countryCallingCode, phone, errorCode, errorMessage,
    } = this.props;

    return (
      <div>
        <SignUp
          onClickSignUp={handleClickSignUp}
          onInputChange={handleInputChange}
          email={email}
          password={password}
          repeatPassword={repeatPassword}
          brand={brand}
          sns={sns}
          serial={serial}
          product={product}
          channel={channel}
          countryCallingCode={countryCallingCode}
          phone={phone}
          errorCode={errorCode}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signUp','email']),
    password: state.auth.getIn(['signUp', 'password']),
    repeatPassword: state.auth.getIn(['signUp', 'repeatPassword']),
    brand: state.auth.getIn(['signUp', 'brand']),
    sns: state.auth.getIn(['signUp', 'sns']),
    serial: state.auth.getIn(['signUp', 'serial']),
    product: state.auth.getIn(['signUp', 'product']),
    channel: state.auth.getIn(['signUp', 'channel']),
    countryCallingCode: state.auth.getIn(['signUp', 'countryCallingCode']),
    phone: state.auth.getIn(['signUp', 'phone']),
    errorCode: state.auth.getIn(['signUp', 'errorCode']),
    errorMessage: state.auth.getIn(['signUp', 'errorMessage']),
    oldUser: state.auth.getIn(['signUp', 'oldUser']),
    alreadySignUp: state.auth.getIn(['signUp', 'alreadySignUp']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUpContainer));
