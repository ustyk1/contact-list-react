import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import './popup.scss';

function Popup({popupText, isOpen, onClose}) {
  return (
    <div className="popup">
      <Snackbar 
        className="popup__body"
        open={isOpen} 
        autoHideDuration={1500} 
        onClose={onClose}
      >
        <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
          {popupText}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Popup;