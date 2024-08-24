let initialState = {
  contactList: [],
  filteredList: []
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_CONTACT':
      const newContact = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        pictures: payload.pictures,
        address: payload.address,
        address2: payload.address2,
        city: payload.city,
        state: payload.state,
        zip: payload.zip
      };
      return {
        ...state,
        contactList: [...state.contactList, newContact],
        filteredList: [...state.contactList, newContact] // 필터링 리스트도 업데이트
      };

    case 'SEARCH_NAME':
      const keyword = payload.keyword ? payload.keyword.toLowerCase() : '';
      const filteredList = state.contactList.filter((contact) => {
        const fullName = `${contact.firstName || ''} ${
          contact.lastName || ''
        }`.toLowerCase();
        return fullName.includes(keyword);
      });
      return {
        ...state,
        filteredList: filteredList
      };

    case 'DELETE_CONTACT':
      const updatedContactList = state.contactList.filter(
        (contact) => contact.email !== payload.email
      );
      return {
        ...state,
        contactList: updatedContactList,
        filteredList: updatedContactList
      };

    case 'ALL_CONTACTS':
      return {
        ...state,
        filteredList: state.contactList
      };

    case 'DELETE_SELECTED_CONTACTS':
      const remainingContacts = state.contactList.filter(
        (contact) => !action.payload.includes(contact.email)
      );
      return {
        ...state,
        contactList: remainingContacts,
        filteredList: remainingContacts
      };

    default:
      return state;
  }
}

export default reducer;
