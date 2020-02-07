import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
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
            {columns.map((column, idx) => (
              <TableCell key={`${column}${idx}`} align="center">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.get("Username")}>
              <TableCell component="th" scope="row" align="center">
                {/*이메일*/}
                {row.get("Attributes").getIn([5, "Value"])}
              </TableCell>
              <TableCell align="center">
                {/*폰넘버*/}
                {row.get("Attributes").getIn([3, "Value"])}
              </TableCell>
              <TableCell align="center">
                {/*{속성}*/}
                {row.get("Attributes").getIn([4, "Value"])}
              </TableCell>
              <TableCell align="center">{row.get("UserStatus")}</TableCell>
              <TableCell align="center">
                {row.get("UserCreateDate").toString()}
              </TableCell>
              <Hidden xsUp>
                {/* channel */}
                <TableCell align="center">
                  {row.get("Attributes").getIn([6, "Value"])}
                </TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
