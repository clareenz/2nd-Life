/* So that the profile page cannot be accessed without logging in
 * start time: 2:44:24 (2nd vid)
 */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAdmin, admin } = useSelector((state) => state.admin);
  if (loading === false) {
    if (!isAdmin) {
      return <Navigate to="/login-admin" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
