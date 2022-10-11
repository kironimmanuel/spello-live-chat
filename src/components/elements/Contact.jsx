import { AiFillMessage } from 'react-icons/ai';

const Contact = (props) => {
  const { lastMessage } = props[1];
  const { photoURL, displayName } = props[1].userInfo;
  return (
    <div
      className="bg-dark rounded shadow-sm d-flex mt-0 mb-2 contact-card"
      role="button">
      <img
        src={photoURL}
        alt={displayName}
        className="rounded-2 shadow"
        width={50}
        height={50}
      />
      <div className="ms-2">
        <p className="mb-0 ms-1 mt-1">{displayName}</p>
        <p className="mb-0 ms-1 text-secondary">
          {lastMessage && <AiFillMessage className="mb-1 me-1" />}
          {lastMessage?.text.length > 8
            ? lastMessage?.text.substring(0, 7) + '...'
            : lastMessage?.text}
        </p>
      </div>
    </div>
  );
};
export default Contact;
