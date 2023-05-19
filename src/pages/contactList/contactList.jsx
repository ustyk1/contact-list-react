import './contactList.scss';

import { useSelector, useDispatch } from 'react-redux'
import { updateContacts, deleteContact } from '../../redux/actions'

import EnhancedTable from '../../components/contactsTable/contactsTable'

import React, { useEffect } from 'react';
import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function ContactList() {
  const title = 'Contacts';
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contacts);

  useEffect(() => {
    contactListService.getContactList()
    .then(data => dispatch(updateContacts(data)))
  }, [])
  
  const handleDeleteContact = (id) => {
    contactListService.deleteContact(id)
    .then(data => dispatch(deleteContact(id)))
  }

  return (
    <div className="contact-list">
      <h2 className='contact-list__title'>{ title }</h2>
      <EnhancedTable contacts={ contactList } onDeleteContact={ handleDeleteContact }></EnhancedTable>
    </div> 
  )
}

export default ContactList;