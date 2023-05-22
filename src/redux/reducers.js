import { UPDATE_CONTACTS, SEARCH_CONTACTS, DELETE_CONTACT } from "./types"

const intialState = {
  contacts: [],
  currentSearchValue: ''
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_CONTACTS:
      console.log('UPDATE_CONTACTS', action.payload);
      return {
        ...state,
        contacts: [...action.payload]
      }
    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(([contactId, contactData]) => contactId !== action.payload)
      }
    case SEARCH_CONTACTS:
      return{
        ...state,
        currentSearchValue: action.payload
      }

    default:
      return state
  }
}

export default reducer;