import React from 'react';
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom';


function SignUpSuccessPage({ history }) {

  const gotoSignIn = () => {
    setTimeout(() => {
      history.push('/sign/in');
    }, 3000);
  };
  return (
    <>
      <Typography variant="h4" component="h5" gutterBottom>
        축하합니다. 통합 회원으로 가입 되었습니다. 3초 후 로그인 화면으로 이동합니다.
      </Typography>


      {gotoSignIn()}
    </>
  );
}

export default withRouter(SignUpSuccessPage);
