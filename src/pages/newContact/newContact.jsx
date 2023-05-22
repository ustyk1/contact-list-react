import './newContact.scss';
import * as React from 'react';
import Popup from '../../components/popup/popup';
import ContactForm from '../../components/form/form';
import { useNavigate } from 'react-router-dom';

import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function NewContact() {
  const [openPopup, setOpenPopup] = React.useState(false);
  const navigate = useNavigate();
 
  const initialValues = {
    contactName: '',
    phoneNumber: '',
    email: '',
    job: '',
    group: '',
    avatar: '',
    gender: 'female',
    favorite: false
  }
  
  const handleClosePopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPopup(false);
  };

  const handleSubmit = (values) => {
    console.log('submit data', values);
    contactListService.saveData(values)
    .then(response => {
      setOpenPopup(true);
      setTimeout(() => navigate('/'), 1000)
    }) 
  }

  return (
    <div className="new-contact">
      <h2>New Contact</h2>
      <Popup 
        onClose={handleClosePopup} 
        popupText="Contact added!" 
        isOpen={openPopup}
      ></Popup>
      <ContactForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        textSubmitButton={'Add contact'}
      ></ContactForm>
    </div>
  )
}

export default NewContact;
