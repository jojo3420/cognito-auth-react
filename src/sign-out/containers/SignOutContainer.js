import React, { Component } from 'react';
import SignOut from 'sign-out/components/SignOut';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { withRouter } from 'react-router-dom';



class SignOutContainer extends Component {


  onClickSignOut = async () => {
    const { AuthActions, history } = this.props;
    try {
      await AuthActions.signOut();
      history.push('/sign/in');
    } catch (e) {
      console.log(e);
    }
  };



  render() {
    const { onClickSignOut  } = this;
    // const { email } = this.props;

    return (
      <>
        <SignOut
          onClickSignOut={onClickSignOut}
        />
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    email: state.auth.getIn(['signUp','email']),

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AuthActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignOutContainer));
