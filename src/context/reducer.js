import { SELECT_CHAT } from "../constants/actions";

const reducer = (state, action) => {
  if (action.type === SELECT_CHAT) {
    const { currentUser, selectedContact } = action.payload;
    return {
      user: selectedContact,
      chatId:
        currentUser.uid > selectedContact.uid
          ? currentUser.uid + selectedContact.uid
          : selectedContact.uid + currentUser.uid,
    };
  }
  throw new Error(`${action.type} does not exist`);
};

export default reducer;
