import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from "common/Copyright";
import { deepOrange, green } from '@material-ui/core/colors';
import main from 'resources/img/main.png';
import aaa from 'resources/img/aaa.png';
import bbb from 'resources/img/bbb.png';
import ccc from 'resources/img/ccc.png';
import ddd from 'resources/img/ddd.png';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: `url(${main})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({ email, password, errorMessage, onInputChange, onClickSubmit, custom }) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClickSubmit();
  };

  const title = getSignInTitle(custom);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={getLogo(custom)} alt={'brand image'} style={{margin: 15}}/>
          {/*<Avatar className={classes.avatar}>*/}
          {/*  <LockOutlinedIcon />*/}
          {/*</Avatar>*/}
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="이메일"
              name="email"
              value={email}
              onChange={e => onInputChange({title: 'email', value: e.target.value})}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              value={password}
              onChange={e => onInputChange({title: 'password', value: e.target.value})}
              id="password"
              autoComplete="current-password"
            />
            {
              errorMessage && (
                <Typography component="h3" variant="h7" color="secondary">
                  {errorMessage}
                </Typography>
              )
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset/password" variant="body2">
                  비밀번호를 잃어버리셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign/up" variant="body2">
                  회원 가입이 필요하신가요?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright/>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

function getSignInTitle(custom) {
  switch (custom) {
    case 'brand': return  'HLI brand site A';
    case 'sns': return  'web_client_brand_B';
    case 'serial': return  'HLI cs site - C';
    case 'product': return  'HLI shopping-mall D';
    default: return "통합 회원 로그인";
  }
}

function getLogo(custom) {
  switch (custom) {
    case 'brand': return aaa;
    case 'sns': return  bbb;
    case 'serial': return ccc;
    case 'product': return  ddd;
    default: return;
  }
}

export default SignIn;
