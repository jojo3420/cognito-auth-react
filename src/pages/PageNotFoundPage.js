import { Link } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import React from 'react';



export default function PageNotFoundPage() {
  return (
    <>
      <Typography variant="h1" component="h2" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>


      <Link
        variant="body2"
        href="/"
      >
        홈 으로 이동
      </Link>
    </>
  );
}

