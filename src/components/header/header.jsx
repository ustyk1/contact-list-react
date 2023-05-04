import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import './header.scss';
import '../../common/styles.scss';

const Search = styled('div')(() => ({
  position: 'relative',
  boxShadow: '1px 1px 4px 1px rgba(83, 86, 90, 0.25)',
  borderRadius: '8px',
  backgroundColor: '#facc14',
  '&:hover': {
    backgroundColor: '#8007FA',
  },
  marginLeft: 0,
  width: 'max-content',
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '0 16px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '12px 12px 12px 0',
    paddingLeft: `50px`,
    transition: 'width 0.5s ease',
    width: '100%',
      width: '16ch',
      '&:focus': {
        width: '26ch',
      },
  },
}));

function Header() {
  return (
    <AppBar className="header" position="static" sx={{p: '20px'}}>
      <div className="header__logo">
        <Link to="/"></Link>
      </div>
      <Toolbar className="header__toolbar toolbar">
        <Search className="toolbar__search search">
          <SearchIconWrapper className="search__icon-wrapper">
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            className="search__input"
            placeholder="Search contact…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button 
          className="toolbar__add-button button" 
          color="inherit"
          startIcon={<AddIcon fontSize="medium"/>}
        >
          <Link to="/new-contact">Add contact</Link>
        </Button>
        <Button
          className="toolbar__menu-button button"
          size="large"
          color="inherit"
          startIcon={<MenuIcon className="menu__icon"/>}
        > Menu
        </Button>        
      </Toolbar>
    </AppBar>
  )
}

export default Header;
