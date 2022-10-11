import { useEffect } from 'react';
import { BsFillChatLeftQuoteFill } from 'react-icons/bs';
import { useGlobalContext } from '../../context/appContext';
import { ContactList } from '../modules';

const BigSidebar = () => {
  const { showBigSidebar, currentUser } = useGlobalContext();

  console.log();
  return (
    <aside>
      <div
        className={
          showBigSidebar
            ? 'bg-grey-900 sidebar-container shadow show-sidebar'
            : 'bg-grey-900 sidebar-container shadow'
        }>
        <header>
          <h1 className="fs-4 text-center py-3 text-info">
            <BsFillChatLeftQuoteFill className="me-2" />
            Spello Live Chat
          </h1>
        </header>
        <div className="container text-left ms-2">
          <img
            src={
              currentUser.photoURL ||
              'https://res.cloudinary.com/de65hz2rz/image/upload/v1665403331/avatar/blank-profile-picture-973460_1280_bslsaz.png'
            }
            alt="avatar"
            className="rounded-2 shadow"
            width={100}
            height={100}
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
        <ContactList />
      </div>
    </aside>
  );
};
export default BigSidebar;
