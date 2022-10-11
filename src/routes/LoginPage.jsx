import { signInWithEmailAndPassword } from 'firebase/auth';
import { BsFillChatLeftQuoteFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log();
    const email = e.target[0].value;
    const password = e.target[1].value;
    e.preventDefault(email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
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
        <h3 className="text-center display-4 fs-2">Login</h3>

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

        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary col-12">
            Submit
          </button>
        </div>
        <footer className="text-center mt-3">
          <p>
            Dont have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </footer>
      </form>
    </div>
  );
};
export default LoginPage;
