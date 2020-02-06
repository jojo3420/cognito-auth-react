import React, { Component } from 'react';
import ResetPassword from 'sign-in/components/ResetPassword';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';



class ResetPasswordContainer extends Component {

  sendResetCode = async () => {
    const { AuthActions, email , history } = this.props;
    try {
      await AuthActions.sendPasswordResetCode({ username: email });
    } catch (e) {
      console.error(`sendResetCode() => `, e);
    }
  };
  submitResetPwd = async () => {
    const { AuthActions, email , code, newPassword, history } = this.props;
    try {
      await AuthActions.submitResetPassword({ username: email, code, newPassword });
      const { changed } = this.props;
      changed && history.push('/sign/in');
    } catch (e) {
      console.error(`submitResetPwd() => `, e);
    }
  };
  handleInputChange = ({ title, value}) => {
    const { AuthActions } = this.props;
    AuthActions.signInInputChange({title, value});
  };

  render() {
    const { email, newPassword, code, sendCodeMode } = this.props;
    const { sendResetCode, submitResetPwd, handleInputChange } = this;
    return (
      <div>
        <ResetPassword
          email={email}
          newPassword={newPassword}
          code={code}
          sendCodeMode={sendCodeMode}
          onSendResetCode={sendResetCode}
          onSubmitResetPwd={submitResetPwd}
          onInputChange={handleInputChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signIn', 'email']),
    newPassword: state.auth.getIn(['signIn', 'newPassword']),
    code: state.auth.getIn(['signIn', 'code']),
    sendCodeMode: state.auth.getIn(['signIn', 'sendCodeMode']),
    changed: state.auth.getIn(['signIn', 'changed']),
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordContainer));
