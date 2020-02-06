import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
} from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function SimpleTable({ columns, rows }) {
  const classes = useStyles();
  if (rows.length < 1) {
    return false;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(column => <TableCell align="center">{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.sub}>
              <TableCell component="th" scope="row" align="center">
                {row.awsEmail}
              </TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.awsCustom}</TableCell>
              <Hidden xsUp>
                <TableCell align="center">{row.sub}</TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
