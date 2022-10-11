import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useGlobalContext();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
