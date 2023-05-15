import './contactList.scss';

import EnhancedTable from '../../components/contactsTable/contactsTable'

import React, { useState, useEffect } from 'react';
import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function ContactList() {
  const title = 'Contacts';
  const [contactList, setContactList] = useState({});
  
  useEffect(() => {
    contactListService.onGetContactList()
    .then(data => {
      const contacts = Object.entries(data);
      // console.log('contacts', data);
      setContactList(contacts);
    })
  }, [])

  return (
    contactList.length ? (
      <div className="contact-list">
        <h2 className='contact-list__title'>{ title }</h2>
        <EnhancedTable contacts={ contactList }></EnhancedTable>
      </div>
    ) : <p>Loading...</p>   
  )
}

export default ContactList;
