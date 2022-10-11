import { BiUserPin } from 'react-icons/bi';
import { IoMdChatboxes } from 'react-icons/io';
import { useGlobalContext } from '../../context/appContext';
import { ChatInput, Messages } from '../modules';
import Navbar from './Navbar';

const Chat = () => {
  const { state } = useGlobalContext();

  return (
    <div className="page-100 col d-flex flex-column justify-content-between">
      <Navbar />
      {state.user.displayName ? (
        <h1 className="display-4 fs-6 text-center text-secondary">
          <IoMdChatboxes /> Chatting with{' '}
          <span className="text-info">{state.user.displayName}</span>
          <span className="ms-2">
            <img
              className="rounded"
              src={state.user.photoURL}
              alt={state.user.displayName}
              width={35}
              height={35}
            />
          </span>
        </h1>
      ) : (
        <h1 className="display-4 fs-6 text-center text-secondary">
          <BiUserPin /> Select a contact to start chatting
        </h1>
      )}
      <div
        className="container bg-grey-700 col-11 rounded chat-display"
        style={{ height: '70vh' }}>
        <Messages />
      </div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
};
export default Chat;
