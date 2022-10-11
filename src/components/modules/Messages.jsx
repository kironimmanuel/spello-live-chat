import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/appContext';
import { db } from '../../services/firebase';
import { Message } from '../elements';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useGlobalContext();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [state.chatId]);

  return (
    <div>
      {messages.map((message) => {
        return <Message key={message.id} {...message} />;
      })}
    </div>
  );
};
export default Messages;
