import './contactList.scss';

import { useSelector, useDispatch } from 'react-redux'
import { updateContacts, deleteContact, selectGroup, showAllContacts, updateSelectedGroup } from '../../redux/actions'

import EnhancedTable from '../../components/contactsTable/contactsTable'

import React, { useEffect } from 'react';
import ContactListService from '../../services/contactListService.js'
const contactListService = new ContactListService();

function ContactList() {
  const title = 'Contacts';
  const dispatch = useDispatch();
  // const contactList = useSelector((state) => state.contacts);
  const selectedGroup = useSelector((state) => state.selectedGroup);

  useEffect(() => {
    contactListService.getContactList()
    .then(data => {
      dispatch(updateContacts(data)); 
      dispatch(showAllContacts(data));
    })
  }, [])
  
  const handleDeleteContact = (id) => {
    contactListService.deleteContact(id)
    .then(data => dispatch(deleteContact(id)))
  }

  return (
    <div className="contact-list">
      <h2 className='contact-list__title'>{ title }</h2>
      <EnhancedTable contacts={ selectedGroup } onDeleteContact={ handleDeleteContact }></EnhancedTable>
    </div> 
  )
}

export default ContactList;