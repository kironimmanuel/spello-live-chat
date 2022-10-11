import { BsFillChatLeftQuoteFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../../context/appContext';
import { ContactList } from '../modules';

const SmallSidebar = () => {
  const { showBigSidebar, currentUser, toggleSidebar } = useGlobalContext();
  console.log();
  return (
    <nav className="small-sidebar">
      <div
        className={
          showBigSidebar
            ? 'bg-grey-900 small-sidebar-container shadow show-small-sidebar'
            : 'bg-grey-900 small-sidebar-container shadow'
        }>
        <header className="text-center">
          <h1 className="fs-4 py-3 text-info ms-2 title">
            <BsFillChatLeftQuoteFill className="me-2" />
            Spello Live Chat
          </h1>
        </header>
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <div className="text-left ms-2">
          <img
            src={
              currentUser.photoURL ||
              'https://res.cloudinary.com/de65hz2rz/image/upload/v1665403331/avatar/blank-profile-picture-973460_1280_bslsaz.png'
            }
            alt="avatar"
            className="rounded-2 shadow"
            width={100}
            role="button"
          />
          <p className="fs-5 mt-2 mb-0">
            {currentUser.displayName || 'Username'}
          </p>
          <p className="text-light text-opacity-50">
            {currentUser.email || ''}
          </p>
        </div>
        <div className="text-secondary">
          <hr />
        </div>
        <ContactList toggleSidebar={toggleSidebar} />
      </div>
    </nav>
  );
};
export default SmallSidebar;
