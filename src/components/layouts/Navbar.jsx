import { signOut } from 'firebase/auth';
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { useGlobalContext } from '../../context/appContext';
import { auth } from '../../services/firebase';

const Navbar = () => {
  const { toggleSidebar } = useGlobalContext();
  return (
    <nav className="navbar">
      <div className="container-fluid justify-content-between">
        <AiOutlineMenu role="button" className="fs-3" onClick={toggleSidebar} />
        <button
          className="navbar-brand me-0 btn border-0 p-0 logout"
          onClick={() => signOut(auth)}>
          Logout <AiOutlineLogout className="mb-1" />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
