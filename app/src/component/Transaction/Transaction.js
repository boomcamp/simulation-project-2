import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { height } from "@material-ui/system";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "white"
  },
  table: {
    maxWidth: "95%"
  }
});

const HeadTable = styled(TableHead)`
  background: skyblue;
`;
const Header = styled.div`
  background: blue;
  display: flex;
  align-items: center;
  height: 70px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: white;
  font-size: 40px;
  padding-left: 50px;
`;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default function Transaction() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Header>Transaction</Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "90vh"
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <HeadTable>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </HeadTable>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}
