import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BsFillChatLeftQuoteFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../services/firebase';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center page-100">
      <form
        className="p-5 pb-1 rounded-1 bg-dark border-top border-5 border-primary shadow"
        onSubmit={handleSubmit}>
        <h1 className="display-4 text-primary fs-1 text-center">
          <BsFillChatLeftQuoteFill className="me-2" />
          Spello Live Chat
        </h1>
        <h3 className="text-center display-4 fs-2">Register</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label display-4 fs-6">
            Username
          </label>
          <input
            type="text"
            className="form-control bg-dark border-0 border-bottom border-1 rounded-0 text-light shadow-none border-secondary "
            id="username"
            aria-describedby="usernameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label display-4 fs-6">
            Email address
          </label>
          <input
            type="email"
            className="form-control bg-dark border-0 border-bottom border-1 rounded-0 text-light shadow-none border-secondary"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label  display-4 fs-6">
            Password
          </label>
          <input
            type="password"
            className="form-control bg-dark border-0 border-bottom border-1 rounded-0 text-light shadow-none border-secondary"
            id="password"
          />
        </div>

        <label htmlFor="file" className="form-label display-4 fs-6">
          Choose an Avatar
        </label>
        <div className="input-group">
          <input
            type="file"
            className="form-control bg-dark border-0 border-bottom border-1 rounded-0 text-light shadow-none border-secondary"
            id="file"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary col-12">
            Submit
          </button>
        </div>
        <footer className="text-center mt-3">
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </footer>
      </form>
    </div>
  );
};
export default RegisterPage;
