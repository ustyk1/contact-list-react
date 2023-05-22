import { 
  UPDATE_CONTACTS, 
  SEARCH_CONTACTS, 
  DELETE_CONTACT, 
  SELECT_GROUP, 
  SHOW_ALL_CONTACTS, 
  SHOW_FAVORITE_CONTACTS 
} from "./types"

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

export const selectGroup = (groupName) => {
  return{
    type: SELECT_GROUP,
    payload: groupName
  }
}

export const showAllContacts = (value) => {
  return{
    type: SHOW_ALL_CONTACTS,
    payload: value
  }
}

export const showFavoriteContacts = (isFavorite) => {
  return{
    type: SHOW_FAVORITE_CONTACTS,
    payload: isFavorite
  }
}
