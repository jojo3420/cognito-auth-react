import React from 'react';
// import { Link } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

function HomePage({ history }) {
  const goto = () => {
    history.push('/sign/in');
  };

  return (
    <>
      {/*<Typography variant="h1" component="h2" gutterBottom>*/}
      {/*  통합 회원 인증 서비스*/}
      {/*</Typography>*/}
      {/*<Link href="/sign/in">*/}
      {/*  통합 회원 로그인*/}
      {/*</Link>*/}
      {/*<br/>*/}
      {/*<Link href="/sign/up">*/}
      {/*  통합 회원 가입*/}
      {/*</Link>*/}

      {goto()}
    </>
  );
}

export default HomePage;
