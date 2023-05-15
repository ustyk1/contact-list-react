export default class ContactListService {
  DB_URL = 'https://simple-contact-list-default-rtdb.firebaseio.com/contacts.json';

  async onSaveData(contact) {
    console.log('input contact', contact);
    const contactId = await fetch(this.DB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    })
    .then(response => {
      console.log('response on save ->>', response);
      return response.json()
    }) 
    .catch((error) => console.log(error));

    return contactId;
  }

  async onGetContactList() {
    const contactList = await fetch(this.DB_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('response on get --->>>', response)
      return response.json()})
    .catch((error) => console.log(error));

    return contactList;
  }
  async onGetContact(id) {
    const contactList = await fetch(`https://simple-contact-list-default-rtdb.firebaseio.com/contacts/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('response on getContact --->>>', response)
      return response.json()})
    .catch((error) => console.log(error));

    return contactList;
  }
}