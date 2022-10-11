import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/appContext';
import { db } from '../../services/firebase';
import { Contact } from '../elements';
import SearchForm from './SearchForm';

const ContactList = ({ toggleSidebar }) => {
  const [chats, setChats] = useState([]);
  const { currentUser, selectChat } = useGlobalContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (selectedContact) => {
    selectChat(selectedContact);
  };

  return (
    <>
      <SearchForm />
      <div className="row gy-3 gx-0 mx-3 contact-list mt-4">
        <div className="mt-0 contacts">
          {Object.entries(chats)
            // Sort to have latest message in contact list on top
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <div
                  onClick={() => handleSelect(chat[1].userInfo)}
                  onMouseUp={toggleSidebar}
                  key={chat[0]}>
                  <Contact {...chat} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default ContactList;
