/* So that the profile page cannot be accessed without logging in
 * start time: 2:44:24 (2nd vid)
 */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    else if(user.role !=="Admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
