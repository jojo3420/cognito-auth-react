import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';
import Main from 'main/components/Main';


class MainContainer extends Component {
  // json web token
  getJwtToken =() => {
    const { cognitoUser } = this.props;
    if (cognitoUser) {
      if (cognitoUser.getSignInUserSession) {
        return cognitoUser.getSignInUserSession().getIdToken().jwtToken;
      }
    }
    return null;
  };

  render() {
    const {  email } = this.props;
    const {  getJwtToken } = this;

    return (
      <Main
        email={email}
        jwtToken={getJwtToken()}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signIn', 'email']),
    cognitoUser: state.auth.getIn(['signIn', 'cognitoUser']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainContainer));
