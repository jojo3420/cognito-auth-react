import React, { Component } from 'react';
import SignIn from 'sign-in/components/SignIn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';


class SignInContainer extends Component {

  handleClickSubmit = async () => {
    const { AuthActions, email, password, history } = this.props;
    try {
      await AuthActions.signIn({ email, password });
      const { logged } = this.props;
      if (logged) {
        AuthActions.clearSignInFormFields();
        history.push('/sign/in/success/');
      }
    } catch (e) {
      console.error(`로그인 실패: ${e.code} - ${e.message}`);
    }


  };
  handleInputChange = ({ title, value}) => {
    const { AuthActions } = this.props;
    AuthActions.signInInputChange({title, value});
  };


  render() {
    const { email, password, errorMessage, custom } = this.props;
    const { handleClickSubmit, handleInputChange } = this;
    return (
      <div>

        <SignIn
          email={email}
          password={password}
          onClickSubmit={handleClickSubmit}
          onInputChange={handleInputChange}
          errorMessage={errorMessage}
          custom={custom}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signIn', 'email']),
    password: state.auth.getIn(['signIn', 'password']),
    logged: state.auth.getIn(['signIn', 'logged']),
    errorMessage: state.auth.getIn(['signIn', 'errorMessage']),
    oldUser: state.auth.getIn(['signUp', 'oldUser']),
    custom: state.auth.getIn(['signUp', 'custom']),
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInContainer));
