import { 
  UPDATE_CONTACTS, 
  SEARCH_CONTACTS, 
  DELETE_CONTACT, 
  SELECT_GROUP, 
  SHOW_ALL_CONTACTS, 
  SHOW_FAVORITE_CONTACTS 
} from "./types"

const intialState = {
  contacts: [],
  currentSearchValue: '',
  selectedGroup: []
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_CONTACTS:
      return {
        ...state,
        contacts: [...action.payload]
      }
    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(([contactId, contactData]) => contactId !== action.payload),
        selectedGroup: state.selectedGroup.filter(([contactId, contactData]) => contactId !== action.payload),
      }
    case SEARCH_CONTACTS:
      return{
        ...state,
        currentSearchValue: action.payload
      }
    case SELECT_GROUP:
      return{
        ...state,
        selectedGroup: state.contacts.filter(([contactId, contactData]) => contactData.group === action.payload)
      }
    case SHOW_ALL_CONTACTS:
      return{
        ...state,
        selectedGroup: [...action.payload]
      }
    case SHOW_FAVORITE_CONTACTS:
      return{
        ...state,
        selectedGroup: state.contacts.filter(([contactId, contactData]) => contactData.favorite === action.payload)
      }
    default:
      return state
  }
}

export default reducer;