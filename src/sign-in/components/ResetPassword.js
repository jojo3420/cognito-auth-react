import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from 'common/Copyright';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword({ email, newPassword, code, onInputChange, sendCodeMode,
                                        onSendResetCode, onSubmitResetPwd }) {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    sendCodeMode ? onSubmitResetPwd() : onSendResetCode();
  };
  const btnLabel = sendCodeMode ? '초기화' : '인증 코드 전송';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          비밀번호 초기화
        </Typography>
        <form
          onSubmit={handleSubmit}
          className={classes.form}>
          {sendCodeMode ?
            (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="resetCode"
                  label="인증코드"
                  name="resetCode"
                  autoComplete="resetCode"
                  value={code}
                  onChange={e => onInputChange({title: 'code', value: e.target.value})}
                />
                <TextField
                  type="password"
                  variant = "outlined"
                  margin="normal"
                  fullWidth
                  id="newPassword"
                  label="신규 비밀번호"
                  name="newPassword"
                  autoComplete="newPassword"
                  value={newPassword}
                  onChange={e => onInputChange({title: 'newPassword', value: e.target.value})}
                />
                <Grid container>
                  <Grid item xs>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={onSendResetCode}
                    >
                      인증코드 재전송
                    </Button>
                  </Grid>
                </Grid>
            </>
          )
          : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => onInputChange({title: 'email', value: e.target.value})}
            />
          )
        }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {btnLabel}
          </Button>

        </form>
        <Grid item>
          <Link href="/sign/in" variant="body2">
            로그인 화면으로 이동
          </Link>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
