import React, { Component } from 'react';
import SignIn from 'sign-in/components/SignIn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';
import axios from 'axios';



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

  onClickFindUser = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.getUserByEmail({email: 'spring3420@daum.net'});

    } catch (e) {
      console.error(e);
    }
    const { oldUser } = this.props;
    console.log("oldUser: ", oldUser);
  };

  onClickGET = async () => {
    try {
      const r = await axios.get('/users');
      console.log(r);
    } catch (e) {
      console.error(e);
    }

  };


  render() {
    const { email, password, errorMessage } = this.props;
    const { handleClickSubmit, handleInputChange } = this;
    const { onClickFindUser, onClickGET } = this;
    return (
      <div>

        <SignIn
          email={email}
          password={password}
          onClickSubmit={handleClickSubmit}
          onInputChange={handleInputChange}
          errorMessage={errorMessage}
          onClickFindUser={onClickFindUser}
          onClickGET={onClickGET}
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
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInContainer));
