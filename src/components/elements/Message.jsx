import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/appContext';

const defaultAvatar =
  'https://res.cloudinary.com/de65hz2rz/image/upload/v1665403331/avatar/blank-profile-picture-973460_1280_bslsaz.png';

const Message = ({ senderId, text, img, date }) => {
  const { currentUser, state } = useGlobalContext();

  const timestamp = (duration) => {
    let time = moment().format('X') - duration;
    if (time >= 60 && time < 6_000) {
      return Math.trunc(time / 100) + 1 + ' min. ago';
    } else if (time >= 6_000) {
      return Math.trunc(time / 6_000) + ' hr. ago';
    } else if (time >= 144_000) {
      return Math.trunc(time / 144_000) + ' d ago';
    } else {
      return 'Just now';
    }
  };

  // New messages will trigger scroll if overflow
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'end', inline: 'end' });
  }, [text, img]);

  return (
    <div
      ref={ref}
      className={`col-12 d-flex m-2 mx-0 ${
        senderId === currentUser.uid && 'flex-row-reverse'
      }`}>
      <div>
        <img
          src={
            senderId === currentUser.uid
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt="avatar"
          className={`rounded-2 mt-2 ${
            senderId === currentUser.uid ? 'me-2 ms-4' : 'me-4 ms-0'
          }`}
          width={45}
          height={45}
        />
        <div
          className={`${
            senderId === currentUser.uid && 'd-flex justify-content-center'
          }`}>
          <p
            className={`text-secondary ${
              senderId === currentUser.uid && 'ms-3 align-items-end'
            }`}
            style={{ fontSize: '.6rem' }}>
            {timestamp(date.seconds)}
          </p>
        </div>
      </div>
      <p
        className={`rounded p-3 align-self-start bg-opacity-50 ${
          senderId === currentUser.uid
            ? 'bg-success chat-bubble-right'
            : 'bg-dark  chat-bubble-left'
        }`}>
        {text}
        {img && <img src={img} alt="uploaded image" />}
      </p>
    </div>
  );
};
export default Message;
