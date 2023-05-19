export default class ContactListService {
  DB_URL = 'https://simple-contact-list-default-rtdb.firebaseio.com/contacts.json';

  async saveData(contact) {
    const contactId = await fetch(this.DB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    .then(response => response.json())
    .then(data => Object.entries(data)) 
    .catch((error) => console.log(error));

    return contactId;
  }

  async getContactList() {
    const contactList = await fetch(this.DB_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => Object.entries(data)) 
    .catch((error) => console.log(error));

    return contactList;
  }
  
  async getContact(id) {
    const contact = await fetch(`https://simple-contact-list-default-rtdb.firebaseio.com/contacts/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .catch((error) => console.log(error));

    return contact;
  }

  async changeContact(id, contact) {
    const contactList = await fetch(`https://simple-contact-list-default-rtdb.firebaseio.com/contacts/${id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    .then(response => response.json())
    .catch((error) => console.log(error));

    return contactList;
  }

  async deleteContact(id) {
    const contactList = await fetch(`https://simple-contact-list-default-rtdb.firebaseio.com/contacts/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .catch((error) => console.log(error));

    return contactList;
  }
}