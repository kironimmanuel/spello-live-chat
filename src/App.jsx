import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from './context/appContext';
import { HomePage, LoginPage, ProtectedRoute, RegisterPage } from './routes';

function App() {
  const { currentUser } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        draggablePercent={80}
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar
        closeOnClick
        toastStyle={{ backgroundColor: '#202225' }}
      />
    </BrowserRouter>
  );
}

export default App;
