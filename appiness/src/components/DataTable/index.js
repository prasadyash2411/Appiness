import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { tableData } from '../../constants/userData'
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

const rows = tableData.user

export default function DataTable() {
  const classes = useStyles();
  const userName = window.localStorage.getItem('username')
  if(userName){
    toast.success(`Succesfuly logged In as ${userName}`)
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">AGE</TableCell>
            <TableCell align="right">GENDER</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">PHONE NO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
