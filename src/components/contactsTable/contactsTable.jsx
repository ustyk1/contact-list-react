import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContactAvatar from '../contactAvatar/contactAvatar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import EnhancedTableHead from './enhancedTableHead/enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableToolbar/enhancedTableToolbar';

import { useSelector } from 'react-redux'
import './contactsTable.scss';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('phoneNumber');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const currentSearchValue = useSelector(state => state.currentSearchValue);

  const rows = props.contacts.map(([id, data]) => {
    return {
      id,
      ...data
    }
  })

  const handleDeleteContact = (event, id) => {
    event.stopPropagation();
    props.onDeleteContact(id)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.contactName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, contactId) => {
    const selectedIndex = selected.indexOf(contactId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, contactId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (contactId) => selected.indexOf(contactId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }} className='table'>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table 
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {!visibleRows.every(row => !row.contactName.toLowerCase().includes(currentSearchValue.toLowerCase())) ? 
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  if (row.contactName.toLowerCase().includes(currentSearchValue.toLowerCase())) {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        id={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox" sx={{width: 50}}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                            onClick={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          sx={{p: '10px'}}
                        >
                          <ContactAvatar contactName={row.contactName}/>
                          {row.contactName}
                        </TableCell>
                        <TableCell align="left" sx={{p: '10px'}}>{row.phoneNumber}</TableCell>
                        <TableCell align="left" sx={{p: '10px'}}>{row.email}</TableCell>
                        <TableCell align="left" sx={{p: '10px'}}>{row.job}</TableCell>
                        <TableCell align="left" sx={{p: '10px'}}>{row.group}</TableCell>
                        <TableCell align="left" sx={{p: '10px'}}>
                          <Tooltip title="Edit" onClick={(event) =>  event.stopPropagation()}>
                            <Link to={`/edit-contact/${row.id}`}>            
                              <IconButton>
                                <EditOutlinedIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete" onClick={event => handleDeleteContact(event, row.id)}>
                            <IconButton>
                              <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                          </Tooltip>                    
                        </TableCell>
                      </TableRow>
                    );
                  } 
                }) : <TableRow><TableCell colSpan={7}>Contact not found!</TableCell></TableRow>
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 61 * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
