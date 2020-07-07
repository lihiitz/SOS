import React from 'react'
import { inject, observer } from 'mobx-react'
import AppBar from './Topic'
import AddNewContact from './AddNewContact';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import "./Contacts.scss"
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

function createData(contactName, contactPhone) {
  return { contactName, contactPhone };
}

const Contacts = inject("userStore")(observer((props) => {
  const classes = useStyles();
  const contacts = props.userStore.contacts
  const rows = [];
  
  for (let c of contacts) {

    rows.push(createData(c.contactName, c.contactPhone))
  }

  return (
    <div className="ContactsBody">
      <AppBar />
      <div id="profile" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: "block" }}>
      <AddNewContact />
      <TableContainer component={Paper}>
        <Table id="ContactText" className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.contactName}>
                <TableCell align="center">{row.contactName}</TableCell>
                <TableCell align="center">{row.contactPhone}</TableCell>
                <TableCell align="center"><Link to={{
                  pathname: "/contactSettings",
                  state: row
                }}>
                  <EditIcon /></Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
      </div>
    </div>
  )
}))

export default Contacts

