/* So that the profile page cannot be accessed without logging in
 * start time: 2:44:24 (2nd vid)
 */

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
