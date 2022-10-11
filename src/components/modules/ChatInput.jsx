import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { RiMailSendFill } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';
import { useGlobalContext } from '../../context/appContext';
import { db, storage } from '../../services/firebase';

const ChatInput = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const { currentUser, state } = useGlobalContext();

  const sendMessage = async (e) => {
    if (!text && !image) return;
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', state.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
      // If no image attached
    } else {
      await updateDoc(doc(db, 'chats', state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          // Timestamp.now since serveTimestamp wont work here
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [state.chatId + '.lastMessage']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', state.user.uid), {
      [state.chatId + '.lastMessage']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });
    // Update the latest message in ContactList or currentUser
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [state.chatId + '.lastMessage']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });
    // Update the latest message in ContactList for user
    await updateDoc(doc(db, 'userChats', state.user.uid), {
      [state.chatId + '.lastMessage']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  return (
    <nav className="navbar bg-grey-900 justify-content-center align-items-center">
      <div className="container-fluid row">
        <div className="btn-group navbar-brand col-4 btn-files file-upload">
          {/* // TODO: Image uploader */}
          {/* <label htmlFor="file-input" role="button">
            <BsPaperclip className="fs-3 text-light mb-2" />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}
        </div>

        <form className="input-group m-2 col p-0" onSubmit={sendMessage}>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            className="form-control"
            placeholder="Write something..."
            aria-label="Message"
            aria-describedby="basic-addon1"
          />
          <button className="btn btn-info" type="button" onClick={sendMessage}>
            <RiMailSendFill />
          </button>
        </form>
      </div>
    </nav>
  );
};
export default ChatInput;
