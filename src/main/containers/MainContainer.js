import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "store/modules/auth";
import { withRouter } from "react-router-dom";
import Main from "main/components/Main";

class MainContainer extends Component {
  // json web token
  getJwtToken = () => {
    const { cognitoUser } = this.props;
    if (cognitoUser) {
      if (cognitoUser.getSignInUserSession) {
        return cognitoUser.getSignInUserSession().getIdToken().jwtToken;
      }
    }
    return null;
  };

  getCognitoUserProperties = () => {
    const { custom, cognitoUser } = this.props;
    if (cognitoUser && cognitoUser.attributes) {
      let {
        sub,
        email: awsEmail,
        phone_number: phoneNumber
      } = cognitoUser.attributes;
      const awsCustom = cognitoUser.attributes[`custom:${custom}`];
      return {
        sub,
        awsEmail,
        phoneNumber,
        awsCustom
      };
    }

    return {};
  };

  onListUsersByPool = async () => {
    const { AuthActions } = this.props;
    await AuthActions.listUsersByPool();
  };

  componentDidMount() {
    this.onListUsersByPool();
  }

  render() {
    const { email, users } = this.props;
    const { getJwtToken, getCognitoUserProperties } = this;
    const {
      sub,
      awsEmail,
      phoneNumber,
      awsCustom
    } = getCognitoUserProperties();
    return (
      <Main
        email={email}
        jwtToken={getJwtToken()}
        sub={sub}
        awsEmail={awsEmail}
        phoneNumber={phoneNumber}
        awsCustom={awsCustom}
        users={users}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.getIn(["signIn", "email"]),
    custom: state.auth.getIn(["common", "custom"]),
    cognitoUser: state.auth.getIn(["signIn", "cognitoUser"]),
    users: state.auth.getIn(["userPool", "users"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainContainer));
