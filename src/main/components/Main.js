import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Box } from "@material-ui/core";
import Copyright from "common/Copyright";
import SignOutContainer from "sign-out/containers/SignOutContainer";
import SimpleTable from "common/SimpleTable";
import SearchBar from "common/SearchBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

export default function Main({
  email,
  jwtToken,
  sub,
  awsEmail,
  phoneNumber,
  awsCustom,
  users,
  termTitle,
  termValue,
  onListUsersByPool,
  onSelectChange,
  onInputChange
}) {
  if (!jwtToken) {
    console.error("jwtToken is null", jwtToken);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
        {/* 로그아웃 버튼 */}
        <Box component="div" m={4}>
          <Box component="div">{awsEmail}</Box>
          <Box component="div">{phoneNumber}</Box>
          <Box component="div">{awsCustom}</Box>
          <Box component="div">
            <SignOutContainer />
          </Box>
        </Box>
      </Grid>
      <Container component="main" className={classes.main} fixed>
        <Typography variant="h5" component="h2" gutterBottom>
          {awsEmail} 님 환영합니다. <br />
        </Typography>
        <Typography variant="body1">
          <SearchBar
            termTitle={termTitle}
            termValue={termValue}
            onSelectChange={onSelectChange}
            onInputChange={onInputChange}
            onListUsersByPool={onListUsersByPool}
          />
          <SimpleTable
            columns={["이메일", "휴대폰", "속성", "가입상태", "가입일"]}
            rows={users}
          />
        </Typography>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1"></Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
