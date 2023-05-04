import './contactList.scss';

import EnhancedTable from '../../components/contactsTable/contactsTable'

function ContactList() {
  const title = 'Contacts';

  return (
    <div className="contact-list">
      <h2 className='contact-list__title'>{ title }</h2>

      <EnhancedTable></EnhancedTable>



    </div>
  )
}

export default ContactList;
