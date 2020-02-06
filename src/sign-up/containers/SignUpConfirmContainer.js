import React, { Component } from 'react';
import SignUpConfirm from 'sign-up/components/SignUpConfirm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';


class SignUpConfirmContainer extends Component {

  constructor(props) {
    super(props);
    const { smsSend, history } = this.props;
    if(!smsSend) {
        history.push('/sign/in');
    }
  }

  handleConfirmSignUp = async () => {
    const { history, AuthActions, email: username,  code } = this.props;
    try {
      await AuthActions.confirmSignUp({
        username, code,
      });
      const { userConfirmed } = this.props;
      if (userConfirmed) {
        AuthActions.clearSignUpFormFields();
        history.push('/sign/up/success');
      }
    } catch (e) {
      console.error(e);
      alert(e.toString());
    }
  };

  handleInputChange = async ({ title, value }) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.signUpInputChange({ title, value });
    } catch(e) {
      console.error(e);
      alert(e);
    }
  };

  handleReSendSignInCode = async () => {
    const { email, AuthActions } = this.props;
    try {
      await AuthActions.resendSignUpCode({ username: email });
      const { smsSend } = this.props;
      smsSend && alert('인증코드를 재전송 완료');
    } catch(e) {
      console.error(e);
      alert(e);
    }


  }

  render() {
    const { email, code } = this.props;
    const { handleConfirmSignUp, handleInputChange, handleReSendSignInCode } = this;
    return (
      <SignUpConfirm
        email={email}
        code={code}
        onConfirmSignUp={handleConfirmSignUp}
        onInputChange={handleInputChange}
        onReSendSignInCode={handleReSendSignInCode}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signUp', 'email']),
    cognitUser: state.auth.getIn(['signUp', 'cognitUser']),
    smsSend: state.auth.getIn(['signUp', 'smsSend']),
    code: state.auth.getIn(['signUp', 'code']),
    userConfirmed: state.auth.getIn(['signUp', 'userConfirmed']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpConfirmContainer));
