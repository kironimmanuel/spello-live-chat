import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscRefresh } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../context/appContext';
import { db } from '../../services/firebase';

const SearchForm = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const { currentUser } = useGlobalContext();

  const handleSearch = async (e) => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const clearSearch = () => {
    setUsername('');
    setUser(null);
  };

  const selectUser = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const mergedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', mergedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', mergedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [mergedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [mergedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [mergedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [mergedId + '.date']: serverTimestamp(),
        });
      }
      toast.success('Contact added', {
        toastId: 'custom-id-yes',
        theme: 'dark',
      });
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setUsername('');
  };

  return (
    <>
      <div className="m-3">
        <label
          htmlFor="search"
          className="form-label display-4 fs-6 text-secondary">
          <AiOutlineSearch className="mb-1" /> Search for Contacts{' '}
          <VscRefresh
            role="button"
            className="mb-1 fs-5 ms-3 text-info"
            onClick={clearSearch}
          />
        </label>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          className="form-control bg-dark border-0 border-bottom border-1 rounded-0 text-light shadow-none border-secondary"
          id="search"
          aria-describedby="searchContact"
          placeholder="Search..."
        />
      </div>
      {user && (
        <div
          className="row gy-3 gx-0 mx-3 contact-list mt-2"
          onClick={selectUser}>
          <div className="mt-0 contacts">
            <div
              className="bg-dark rounded d-flex shadow mt-0 mb-2 contact-card"
              role="button">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-2 shadow"
                width={50}
              />
              <div className="ms-2">
                <p className="mb-0 ms-1 mt-1">{user.displayName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-secondary">
        <hr />
      </div>
    </>
  );
};
export default SearchForm;
