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

import { Link } from 'react-router-dom';

import EnhancedTableHead from './enhancedTableHead/enhancedTableHead';
import EnhancedTableToolbar from './enhancedTableToolbar/enhancedTableToolbar';

import './contactsTable.scss';

function createData(contactName, phoneNumber, email, job, group) {
  return {
    contactName,
    phoneNumber,
    email,
    job,
    group,
  };
}

const rows = [
  createData('Leanne Graham', '1-770-736-8031', "Sincere@april.biz", 'Romaguera-Crona', 'job',),
  createData('Ervin Howell', '010-692-6593', 'Shanna@melissa.tv', "Keebler LLC", ''),
  createData('Clementine Bauch', '1-463-123-4447', "Nathan@yesenia.net", "Keebler LLC", ''),
  createData('Patricia Lebsack', '(254)954-1289', "Julianne.OConner@kory.orgqqqqqqqqqqqq", "Yost and Sons", ''),
  createData('Chelsey Dietrich', '1-477-935-8478', "Lucio_Hettinger@annie.ca", "Romaguera-Jacobson", ''),
  createData('Dennis Schulist', '210-067-6132', "Karley_Dach@jasper.info", "Abernathy Group", ''),
  createData('Kurtis Weissnat', '586-493-6943', "Telly.Hoeger@billy.biz", "Deckow-Crist", ''),
  createData('Jelly Bean', '(775)976-6794', "Sherwood@rosamond.me", "Deckow-Crist", ''),
  createData('Nicholas Runolfsdottir', '024-648-3804',"Chaim_McDermott@dana.io", "Deckow-Crist", ''),
  createData('Glenna Reichert', '089-245-1104', "Rey.Padberg@karina.biz", "Deckow-Crist", ''),
  createData('Clementina DuBuque', '077-987-1254', "Rey.Padberg@karina.biz", "Deckow-Crist", ''),
  createData('Rick Grund', '099-245-1564', "Rey.Padberg@karina.biz", "Deckow-Crist", ''),
  createData('Paula Rose', '089-295-1104', "Rey.Padberg@karina.biz", "Deckow-Crist", ''),
];

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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('phoneNumber');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleClick = (event, contactName) => {
    const selectedIndex = selected.indexOf(contactName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, contactName);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (contactName) => selected.indexOf(contactName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
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
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.contactName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.contactName}
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
                        onClick={(event) => handleClick(event, row.contactName)}
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
                        <Link to="/edit-contact">            
                          <IconButton>
                            <EditOutlinedIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      {/* <Tooltip title="Delete" onClick={(event) =>  event.stopPropagation()}>
                        <IconButton>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>                     */}
                    </TableCell>
                  </TableRow>
                );
              })}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
