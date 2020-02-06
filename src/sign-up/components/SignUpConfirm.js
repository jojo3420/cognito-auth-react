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

export default function SignUpConfirm({email, code, onConfirmSignUp, onInputChange, onReSendSignInCode }) {
	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		onConfirmSignUp();
	};
	const handleInput = (e) => {
		const {value} = e.target;
		onInputChange({title: 'code', value});
	};
	const handleReSend = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onReSendSignInCode();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					인증 코드 입력
				</Typography>
				<form
					onSubmit={handleSubmit}
					className={classes.form}>
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
						disabled={true}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="code"
						label="인증코드"
						type="text"
						id="code"
						autoComplete="current-password"
						value={code}
						onChange={handleInput}
					/>
					<Grid container>
						<Grid item xs>
							<Button
								type="button"
								color="secondary"
								onClick={handleReSend}
							>
								인증코드 재전송
							</Button>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						확인
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
