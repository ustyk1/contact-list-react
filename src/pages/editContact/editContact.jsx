import './editContact.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ContactForm from '../../components/form/form';
import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function EditContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [isDataGetted, setIsDataGetted] = useState(false);

  useEffect(() => {
    console.log(JSON.stringify(id));
    console.log('get contact');
   
    contactListService.onGetContact(id)
    .then(data => {
      // const contacts = Object.entries(data);
      console.log('contacts', data);
      setContact(data);
      setIsDataGetted(true);
    })
  }, [])

  return (
    <div className="edit-contact">
      <h2>Edit Contact</h2>
      { isDataGetted ? 
        <ContactForm initialValues={contact}></ContactForm> : 
        <p>Loading...</p>
      }
    </div>
  )
}

export default EditContact;
