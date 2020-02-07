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

  getUsersAllByPool = async () => {
    const { AuthActions, termTitle, termValue } = this.props;
    await AuthActions.listUsersByPool({ termTitle, termValue });
  };

  onListUsersByPool = async () => {
    const { AuthActions, termTitle, termValue } = this.props;
    termTitle && termValue && await AuthActions.listUsersByPool({ termTitle, termValue });
  };

  handleSelectChange = ({ value }) => {
    const { AuthActions } = this.props;
    AuthActions.searchSelectChange({ termTitle: value });
  };
  handleInputChange = ({ value }) => {
    const { AuthActions } = this.props;
    AuthActions.searchInputChange({ termValue: value });
  };

  componentDidMount() {
    // get all list
    this.getUsersAllByPool();
  }

  render() {
    const { email, users, selectOption } = this.props;
    const {
      getJwtToken,
      getCognitoUserProperties,
      onListUsersByPool,
      handleSelectChange,
      handleInputChange
    } = this;
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
        onListUsersByPool={onListUsersByPool}
        onSelectChange={handleSelectChange}
        onInputChange={handleInputChange}
        selectOption={selectOption}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.getIn(["signIn", "email"]),
    custom: state.auth.getIn(["common", "custom"]),
    cognitoUser: state.auth.getIn(["signIn", "cognitoUser"]),
    users: state.auth.getIn(["userPool", "users"]),
    termTitle: state.auth.getIn(["userPool", "termTitle"]),
    termValue: state.auth.getIn(["userPool", "termValue"]),
    selectOption: state.auth.getIn(["common", "selectOption"]),
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
