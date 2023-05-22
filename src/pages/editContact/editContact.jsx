import './editContact.scss';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ContactForm from '../../components/form/form';
import Popup from '../../components/popup/popup';
import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function EditContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [isDataGetted, setIsDataGetted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {    
    contactListService.getContact(id)
    .then(data => {
      setContact(data);
      setIsDataGetted(true);
    })
  }, [id]);

  const handleClosePopup = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenPopup(false);
  };
  
  const handleSubmit = (values) => {
    contactListService.changeContact(id, values)
    .then(response => {
      setOpenPopup(true);
      setTimeout(() => navigate('/'), 1000)
    }) 
  }

  return (
    <div className="edit-contact">
      <h2>Edit Contact</h2>
      <Popup 
        onClose={handleClosePopup} 
        popupText="Contact edited!" 
        isOpen={openPopup}
      ></Popup>
      { isDataGetted ? 
        <ContactForm 
          initialValues={contact} 
          onSubmit={handleSubmit} 
          textSubmitButton={'Edit contact'}
        ></ContactForm> : <p>Loading...</p>
      }
    </div>
  )
}

export default EditContact;
