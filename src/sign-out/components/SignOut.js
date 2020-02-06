import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";


function SignOut({ onClickSignOut }) {
  return (
    <>
      <Button
        onClick={onClickSignOut}
      >
        로그아웃
      </Button>
    </>
  );
}

export default SignOut;
