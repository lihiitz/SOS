import React from 'react'
import { inject, observer } from 'mobx-react'
import AppBar from './Topic'
import AddNewContact from './AddNewContact';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

function createData(name, phone) {
  return { name, phone };
}

const Contacts = inject("userStore")(observer((props) => {
  const classes = useStyles();
  const contacts = props.userStore.contacts
  const rows = [];
  for (let c of contacts) {
    
    rows.push(createData(c.contactName, c.contactPhone))
  }

  return (
    <div>
      <AppBar />
      <AddNewContact />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Phone</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}))

export default Contacts

