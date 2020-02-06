import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from "common/Copyright";
// import countryCodes from 'country-codes-list';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({
  email, password, repeatPassword, brand,
  countryCallingCode, phone, channel, errorCode, errorMessage,
  onClickSignUp, onInputChange }) {

  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    password === repeatPassword ? onClickSignUp() : alert('password 가 일치하지 않습니다.');
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                required
                fullWidth
                id="email"
                label="이메일"
                value={email}
                name="email"
                autoComplete="email"
                onChange={e => onInputChange({title: 'email', value: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                value={password}
                id="password"
                autoComplete="current-password"
                onChange={e => onInputChange({title: 'password', value: e.target.value })}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label="비밀번호 확인"
                type="password"
                value={repeatPassword}
                id="repeatPassword"
                autoComplete="repeat-password"
                onChange={e => onInputChange({title: 'repeatPassword', value: e.target.value })}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="brand"
                label="brand"
                type="text"
                value={brand}
                id="brand"
                autoComplete="brand"
                onChange={e => onInputChange({title: 'brand', value: e.target.value })}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="channel"
                label="channel"
                type="text"
                value={channel}
                id="channel"
                autoComplete="channel"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {getCountryCallCodeList({countryCallingCode, onInputChange})}
            <Grid item xs={8}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                value={phone}
                label="전화번호"
                autoFocus
                onChange={e => onInputChange({title: 'phone', value: e.target.value })}
              />
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <FormControlLabel*/}
            {/*    control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
            {/*    label="이메일을 통해 마케팅 프로모션 및 업데이트를 받고 싶습니다."*/}
            {/*  />*/}
            {/*</Grid>*/}
          </Grid>
          <Grid item xs={12}>
            {errorCode && (
              <Typography color="secondary">
                {errorMessage}
              </Typography>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign/in" variant="body2">
                이미 회원이신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function getCountryCallCodeList({ countryCallingCode: code, onInputChange }) {
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  const handleChange = (e) => {
      e.preventDefault();
      const { value } = e.target;
      onInputChange({title: 'countryCallingCode', value});
  };

  // 국제전화 번호 생성 코드
  // const countryCallingCode = countryCodes.customList('countryCallingCode', '[+{countryCallingCode}]');
  // // console.log('countryCallingCode:', countryCallingCode);
  // const callingCodes = [];
  // for (let property in countryCallingCode) {
  //   callingCodes.push(<MenuItem value={property}>+{property}</MenuItem>);
  // }
  return (
    <Grid item xs={4}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">국제전화코드</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={code}
          onChange={handleChange}
        >
          {/*{callingCodes}*/}
          <MenuItem value={`+82`}>+82</MenuItem>
        </Select>
    </FormControl>
    </Grid>
  );
}
