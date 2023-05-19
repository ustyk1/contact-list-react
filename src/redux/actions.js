import { UPDATE_CONTACTS, SEARCH_CONTACTS, DELETE_CONTACT } from "./types"

export const updateContacts = (contacts) => {
  return{
    type: UPDATE_CONTACTS,
    payload: contacts
  }
}

export const deleteContact = (id) => {
  return{
    type: DELETE_CONTACT,
    payload: id
  }
}

export const searchContacts = (value) => {
  return{
    type: SEARCH_CONTACTS,
    payload: value
  }
}