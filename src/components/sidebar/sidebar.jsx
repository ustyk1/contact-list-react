import './sidebar.scss';
import { useSelector, useDispatch } from 'react-redux'
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function SelectedListItem() {
  const contacts = useSelector((state)=> state.contacts);
  const numberofContacts = contacts.length;

  const contactStatuses = {
    work: {
      count: 0,
      icon: <WorkOutlineIcon/>,
      index: 0
    },
    family: {
      count: 0,
      icon: <Diversity1Icon/>,
      index: 1
    },
    private: {
      count: 0,
      icon: <LockOpenIcon/>,
      index: 2
    },
    friends: {
      count: 0,
      icon: <Diversity3Icon/>,
      index: 3
    },
    other: {
      count: 0,
      icon: <FolderOpenIcon/>,
      index: 4
    },
    favorite: {
      count: 0,
      icon: <FavoriteBorderIcon/>,
      index: 5
    }
  }

  const statusNames = [...Object.keys(contactStatuses)];

  contacts.forEach(([contactId, contactData]) => {
    contactStatuses[contactData.group].count += 1;
    contactData.favorite && (contactStatuses.favorite.count += 1);
  });

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <aside className="sidebar">
      <Box sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper' }}>
        <h2>All contacts: {numberofContacts}</h2>
        <List component="nav" aria-label="main mailbox folders">
          {statusNames.map(statusName => {
            if (statusName === 'favorite') {
              return
            } else {
               return (
                <ListItemButton
                  selected={selectedIndex === contactStatuses[statusName].index}
                  onClick={(event) => handleListItemClick(event, contactStatuses[statusName].index)}
                  key={contactStatuses[statusName].index}
                >
                  <ListItemIcon>
                    {contactStatuses[statusName].icon}
                  </ListItemIcon>
                  <ListItemText primary={statusName} />
                  <ListItemText primary={contactStatuses[statusName].count} />
                </ListItemButton>
              ) 
            } 
          })}
          <Divider></Divider>
          <ListItemButton
                selected={selectedIndex === contactStatuses.favorite.index}
                onClick={(event) => handleListItemClick(event, contactStatuses.favorite.index)}
              >
                <ListItemIcon>
                  {contactStatuses.favorite.icon}
                </ListItemIcon>
                <ListItemText primary={'favorite'} />
                <ListItemText primary={contactStatuses.favorite.count} />
              </ListItemButton>
        </List>
      </Box>
    </aside>
  );
}
