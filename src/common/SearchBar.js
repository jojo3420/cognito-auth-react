import React from 'react';
import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Paper,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(2),
		minWidth: 150,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	input: {
		width: 300,
	},
}));

function SearchBar({
	termTitle,
	termValue,
	onSelectChange,
	onInputChange,
	onListUsersByPool,
}) {
	const classes = useStyles();

	const handleSubmit = e => {
		e.preventDefault();
		onListUsersByPool();
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<form onSubmit={handleSubmit}>
							<FormControl className={classes.formControl}>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={termTitle}
									onChange={e => onSelectChange({ value: e.target.value })}
								>
									<MenuItem value={'email'}>이메일</MenuItem>
									<MenuItem value={'phoneNumber'}>휴대폰</MenuItem>
								</Select>
							</FormControl>
							<TextField
								className={classes.input}
								id="standard-basic"
								label="입력"
								onChange={e => onInputChange({ value: e.target.value })}
							/>
							<Button variant="contained" color="primary" type="submit">
								검색
							</Button>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
export default SearchBar;
